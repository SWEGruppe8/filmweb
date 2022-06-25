import type { Regisseur } from './film';
import { type Film, type FilmGenre, type Studio } from './film';
import { type FilmServer, toFilm } from './filmServer';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    HttpClient,
    type HttpErrorResponse,
    HttpParams,
    type HttpResponse,
} from '@angular/common/http';
import { type Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { FindError } from './errors';
import { Injectable } from '@angular/core';
import log from 'loglevel';
import { paths } from '../../shared';

export interface Suchkriterien {
    titel: string;
    studio: Studio | '';
    genre: FilmGenre | '';
    // regisseur: Regisseur | { nachname: ''; vorname: '' };
    schauspieler: { leonardo: boolean; salma: boolean };
}

export interface FilmeServer {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _embedded: {
        filme: FilmServer[];
    };
}

// Methoden der Klasse HttpClient
//  * get(url, options) – HTTP GET request
//  * post(url, body, options) – HTTP POST request
//  * put(url, body, options) – HTTP PUT request
//  * patch(url, body, options) – HTTP PATCH request
//  * delete(url, options) – HTTP DELETE request

// Eine Service-Klasse ist eine "normale" Klasse gemaess ES 2015, die mittels
// DI in eine Komponente injiziert werden kann, falls sie innerhalb von
// provider: [...] bei einem Modulbereitgestellt wird.
// Eine Komponente realisiert gemaess MVC-Pattern den Controller und die View.
// Die Anwendungslogik wird vom Controller an Service-Klassen delegiert.
// Service:
// - wiederverwendbarer Code: in ggf. verschiedenen Controller
// - Zugriff auf Daten, z.B. durch Aufruf von RESTful Web Services
// - View (HTML-Template) <- Controller <- Service
// https://angular.io/guide/singleton-services

/**
 * Die Service-Klasse zu Filme wird zum "Root Application Injector"
 * hinzugefuegt und ist in allen Klassen der Webanwendung verfuegbar.
 */
@Injectable({ providedIn: 'root' })
export class FilmReadService {
    readonly #baseUrl = paths.api;

    /**
     * @param httpClient injizierter Service HttpClient (von Angular)
     * @return void
     */
    constructor(private readonly httpClient: HttpClient) {
        log.debug('FilmReadService.constructor: baseUrl=', this.#baseUrl);
    }

    /**
     * Filme anhand von Suchkriterien suchen
     * @param suchkriterien Die Suchkriterien
     * @returns Gefundene Filme oder Statuscode des fehlerhaften GET-Requests
     */
    find(
        suchkriterien: Suchkriterien | undefined = undefined, // eslint-disable-line unicorn/no-useless-undefined
    ): Observable<Film[] | FindError> {
        log.debug('FilmReadService.find: suchkriterien=', suchkriterien);
        // log.debug(
        //     `FilmReadService.find: suchkriterien=${JSON.stringify(
        //         suchkriterien,
        //     )}`,
        // );

        const url = this.#baseUrl;
        log.debug('FilmReadService.find: url=', url);

        // Query-Parameter ?titel=x&genre=KINDLE&...
        const params = this.#suchkriterienToHttpParams(suchkriterien);

        // Promise:
        // - Einzelner Wert
        // - Kein Cancel
        //
        // Observable aus RxJS:
        // - die Werte werden "lazy" in einem Stream bereitgestellt
        // - Operatoren: map, forEach, filter, ...
        // - Ausfuehrung nur dann, wenn es einen Aufruf von subscribe() gibt
        // - firstValueFrom() konvertiert den ersten Wert in ein Promise
        // - Cancel ist moeglich
        // https://stackoverflow.com/questions/37364973/what-is-the-difference-between-promises-and-observables

        return (
            this.httpClient
                .get<FilmeServer>(url, { params })

                // pipe ist eine "pure" Funktion, die ein Observable in ein NEUES Observable transformiert
                .pipe(
                    // 1 Datensatz empfangen und danach implizites "unsubscribe"
                    // entspricht take(1)
                    first(),

                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    catchError((err: unknown, _$) =>
                        of(this.#buildFindError(err as HttpErrorResponse)),
                    ),

                    // entweder Observable<FilmeServer> oder Observable<FindError>
                    map(restResult => this.#toFilmArrayOrError(restResult)),
                )
        );

        // Same-Origin-Policy verhindert Ajax-Datenabfragen an einen Server in
        // einer anderen Domain. JSONP (= JSON mit Padding) ermoeglicht die
        // Uebertragung von JSON-Daten ueber Domaingrenzen.
        // Falls benoetigt, gibt es in Angular dafuer den Service Jsonp.
    }

    #toFilmArrayOrError(
        restResult: FilmeServer | FindError,
    ): Film[] | FindError {
        log.debug(
            'FilmReadService.#toFilmArrayOrError: restResult=',
            restResult,
        );
        if (restResult instanceof FindError) {
            return restResult;
        }

        // eslint-disable-next-line no-underscore-dangle
        const filme = restResult._embedded.filme.map(filmServer =>
            toFilm(filmServer),
        );
        log.debug('FilmReadService.#toFilmArrayOrError: filme=', filme);
        return filme;
    }

    /**
     * Ein Film anhand der ID suchen
     * @param id Die ID des gesuchten Films
     */
    findById(id: string | undefined): Observable<Film | FindError> {
        log.debug('FilmReadService.findById: id=', id);

        if (id === undefined) {
            log.debug('FilmReadService.findById: Keine Id');
            return of(this.#buildFindError());
        }

        // wegen fehlender Versionsnummer (im ETag) nachladen
        const url = `${this.#baseUrl}/${id}`;
        log.debug('FilmReadService.findById: url=', url);

        return (
            this.httpClient
                /* eslint-disable object-curly-newline */
                .get<FilmServer>(url, {
                    observe: 'response',
                })
                /* eslint-enable object-curly-newline */

                .pipe(
                    // 1 Datensatz empfangen und danach implizites "unsubscribe"
                    first(),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    catchError((err: unknown, _$) => {
                        const errResponse = err as HttpErrorResponse;
                        return of(this.#buildFindError(errResponse));
                    }),

                    // entweder Observable<HttpResponse<FilmServer>> oder Observable<FindError>
                    map(restResult => this.#toFilmOrError(restResult)),
                )
        );
    }

    #toFilmOrError(
        restResult: FindError | HttpResponse<FilmServer>,
    ): Film | FindError {
        if (restResult instanceof FindError) {
            return restResult;
        }

        const { body, headers } = restResult;
        if (body === null) {
            return this.#buildFindError();
        }

        const etag = headers.get('ETag') ?? undefined;
        log.debug('FilmReadService.#toFilmOrError: etag=', etag);

        const film = toFilm(body, etag);
        return film;
    }

    /**
     * Suchkriterien in Request-Parameter konvertieren.
     * @param suchkriterien Suchkriterien fuer den GET-Request.
     * @return Parameter fuer den GET-Request
     */
    #suchkriterienToHttpParams(
        suchkriterien: Suchkriterien | undefined,
    ): HttpParams {
        log.debug(
            'FilmReadService.#suchkriterienToHttpParams: suchkriterien=',
            suchkriterien,
        );
        let httpParams = new HttpParams();

        if (suchkriterien === undefined) {
            return httpParams;
        }

        const { titel, studio, genre, schauspieler } = suchkriterien;
        const { leonardo, salma } = schauspieler;

        if (titel !== '') {
            httpParams = httpParams.set('titel', titel);
        }
        if (genre !== '') {
            httpParams = httpParams.set('genre', genre);
        }
        if (studio !== '') {
            httpParams = httpParams.set('studio', studio);
        }
        if (leonardo) {
            httpParams = httpParams.set('leonardo', 'true');
        }
        if (salma) {
            httpParams = httpParams.set('salma', 'true');
        }
        return httpParams;
    }

    #buildFindError(err?: HttpErrorResponse) {
        if (err === undefined) {
            return new FindError(-1);
        }

        if (err.error instanceof ProgressEvent) {
            const msg = 'Client-seitiger oder Netzwerkfehler';
            log.error(msg, err.error);
            return new FindError(-1, err);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { status, error } = err;
        log.debug(
            'FilmReadService.#buildFindError: status / Response-Body=',
            status,
            error,
        );
        return new FindError(status, err);
    }
}
