import {
    HttpClient,
    type HttpErrorResponse,
    HttpHeaders,
    HttpResponse,
} from '@angular/common/http';
import { type Observable, of } from 'rxjs';
import { RemoveError, SaveError, UpdateError } from './errors';
import { catchError, first, map } from 'rxjs/operators';
import { type Film } from './film';
import { Injectable } from '@angular/core';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';
import { paths } from '../../shared';
import { toFilmServer } from './filmServer';

// Methoden der Klasse HttpClient
//  * get(url, options) – HTTP GET request
//  * post(url, body, options) – HTTP POST request
//  * put(url, body, options) – HTTP PUT request
//  * patch(url, body, options) – HTTP PATCH request
//  * delete(url, options) – HTTP DELETE request

// Eine Service-Klasse ist eine "normale" Klasse gemaess ES 2015, die mittels
// DI in eine Komponente injiziert werden kann, falls sie innerhalb von
// provider: [...] bei einem Modul bereitgestellt wird.
// Eine Komponente realisiert gemaess MVC-Pattern den Controller und die View.
// Die Anwendungslogik wird vom Controller an Service-Klassen delegiert.

/**
 * Die Service-Klasse zu Filme wird zum "Root Application Injector"
 * hinzugefuegt und ist in allen Klassen der Webanwendung verfuegbar.
 */
@Injectable({ providedIn: 'root' })
export class FilmWriteService {
    readonly #baseUrl = paths.api;

    /**
     * @param httpClient injizierter Service HttpClient (von Angular)
     * @return void
     */
    constructor(private readonly httpClient: HttpClient) {
        log.debug('FilmWriteService.constructor: baseUrl=', this.#baseUrl);
    }

    /**
     * Ein neues Film anlegen
     * @param neuesFilm Das JSON-Objekt mit dem neuen Film
     */
    save(film: Film): Observable<SaveError | string> {
        log.debug('FilmWriteService.save: film=', film);
        film.release = Temporal.Now.plainDateISO();
        log.debug('FilmWriteService.save: film=', film);

        /* eslint-disable @typescript-eslint/naming-convention */
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'text/plain',
        });
        /* eslint-enable @typescript-eslint/naming-convention */

        return this.httpClient
            .post(this.#baseUrl, toFilmServer(film), {
                headers,
                observe: 'response',
                responseType: 'text',
            })
            .pipe(
                first(),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                catchError((err: unknown, _$) => {
                    const errResponse = err as HttpErrorResponse;
                    return of(new SaveError(errResponse.status, errResponse));
                }),

                // entweder Observable<HttpResponse<string>> oder Observable<SaveError>
                map(result => this.#mapSaveResultToId(result)),
            );
    }

    #mapSaveResultToId(
        result: HttpResponse<string> | SaveError,
    ): SaveError | string {
        if (!(result instanceof HttpResponse)) {
            return result;
        }

        const response = result;
        log.debug(
            'FilmWriteService.#mapSaveResultToId: map: response',
            response,
        );

        // id aus Header "Locaction" extrahieren
        const location = response.headers.get('Location');
        const id = location?.slice(location.lastIndexOf('/') + 1);

        if (id === undefined) {
            return new SaveError(-1, 'Keine Id');
        }

        return id;
    }

    /**
     * Ein vorhandenes Film aktualisieren
     * @param film Das JSON-Objekt mit den aktualisierten Filmdaten
     */
    update(film: Film): Observable<Film | UpdateError> {
        log.debug('FilmWriteService.update: film=', film);

        // id, version und schlagwoerter gehoeren nicht zu den serverseitigen Nutzdaten
        const { id, version, schlagwoerter, ...filmDTO } = film; // eslint-disable-line @typescript-eslint/no-unused-vars
        if (version === undefined) {
            const msg = `Keine Versionsnummer fuer den Film ${id}`;
            log.debug(msg);
            return of(new UpdateError(-1, msg));
        }

        const url = `${this.#baseUrl}/${id}`;
        /* eslint-disable @typescript-eslint/naming-convention */
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'text/plain',
            'If-Match': `"${version}"`,
        });
        /* eslint-enable @typescript-eslint/naming-convention */
        log.debug('FilmWriteService.update: headers=', headers);

        log.debug('FilmWriteService.update: filmDTO=', filmDTO);
        return this.httpClient
            .put(url, filmDTO, { headers, observe: 'response' })
            .pipe(
                first(),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                catchError((err: unknown, _$) => {
                    const errResponse = err as HttpErrorResponse;
                    log.debug('FilmWriteService.update: err=', err);
                    return of(new UpdateError(errResponse.status, errResponse));
                }),

                map(result => this.#mapUpdateResultToVersion(result)),

                map(versionOderError => {
                    if (versionOderError instanceof UpdateError) {
                        return versionOderError;
                    }
                    film.version = versionOderError;
                    return film;
                }),
            );
    }

    #mapUpdateResultToVersion(
        result: HttpResponse<unknown> | UpdateError,
    ): UpdateError | number {
        if (result instanceof UpdateError) {
            return result;
        }

        const response = result;
        log.debug(
            'FilmWriteService.#mapUpdateResultToVersion: response',
            response,
        );
        const etag = response.headers.get('ETag');
        log.debug('FilmWriteService.#mapUpdateResultToVersion: etag=', etag);

        const ende = etag?.lastIndexOf('"');
        const versionStr = etag?.slice(1, ende) ?? '1';
        return Number.parseInt(versionStr, 10);
    }

    /**
     * Ein Film l&ouml;schen
     * @param film Das JSON-Objekt mit dem zu loeschenden Film
     */
    remove(film: Film): Observable<Record<string, unknown> | RemoveError> {
        log.debug('FilmWriteService.remove: film=', film);
        const url = `${this.#baseUrl}/${film.id}`;

        return this.httpClient.delete(url).pipe(
            first(),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            catchError((err: unknown, _$) => {
                const errResponse = err as HttpErrorResponse;
                return of(new RemoveError(errResponse.status));
            }),

            map(result => {
                if (result instanceof RemoveError) {
                    return result;
                }
                return {};
            }),
        );
    }
}
