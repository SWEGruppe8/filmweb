import { ActivatedRoute, Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, type OnInit } from '@angular/core';
import {
    type Film,
    type FilmGenre,
    FilmReadService,
    FilmWriteService,
    FindError,
    type Studio,
    UpdateError,
} from '../shared';
/* eslint-enable @typescript-eslint/consistent-type-imports */

import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-film</code>
 */
@Component({
    selector: 'hs-update-film',
    templateUrl: './update-film.component.html',
})
export class UpdateFilmComponent implements OnInit {
    film: Film | undefined;

    readonly updateForm = new FormGroup({});

    errorMsg: string | undefined;

    // eslint-disable-next-line max-params
    constructor(
        private readonly service: FilmWriteService,
        private readonly readService: FilmReadService,
        private readonly titleService: Title,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
        log.debug('UpdateFilmComponent.constructor()');
    }

    ngOnInit() {
        // Pfad-Parameter aus /filme/:id/update
        const id = this.route.snapshot.paramMap.get('id') ?? undefined;

        this.readService
            .findById(id)
            .pipe(
                first(),
                tap(result => {
                    this.#setProps(result);
                    log.debug('UpdateFilmComponent.ngOnInit: film=', this.film);
                }),
            )
            .subscribe();
    }

    /**
     * Die aktuellen Stammdaten f&uuml;r das angezeigte Film-Objekt
     * zur&uuml;ckschreiben.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    onSubmit() {
        if (this.updateForm.pristine || this.film === undefined) {
            log.debug('UpdateFilmComponent.onSubmit: keine Aenderungen');
            return;
        }

        const { titel } = this.updateForm.value as { titel: string };
        const { genre } = this.updateForm.value as { genre: FilmGenre };
        const { studio } = this.updateForm.value as {
            studio: Studio | '' | undefined;
        };
        const { rating } = this.updateForm.value as { rating: number };
        const { isan } = this.updateForm.value as { isan: string };

        const { film, service } = this;

        // release, umsatz und regisseur koennen im Formular nicht geaendert werden
        film.titel = titel;
        film.genre = genre;
        film.studio = studio;
        film.rating = rating;
        film.isan = isan;
        log.debug('UpdateFilmComponent.onSubmit: film=', film);

        service
            .update(film)
            .pipe(
                first(),
                tap(result => this.#handleUpdateResult(result)),
            )
            .subscribe({ next: () => this.#navigateHome() });

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite
        return false;
    }

    #setProps(result: Film | FindError) {
        if (result instanceof FindError) {
            this.#handleFindError(result);
            return;
        }

        this.film = result;
        this.errorMsg = undefined;

        const titel = `Aktualisieren ${this.film.id}`;
        this.titleService.setTitle(titel);
    }

    #handleFindError(err: FindError) {
        const { statuscode } = err;
        log.debug('UpdateFilmComponent.#handleError: statuscode=', statuscode);

        this.film = undefined;

        switch (statuscode) {
            case HttpStatusCode.NotFound:
                this.errorMsg = 'Kein Film gefunden.';
                break;
            case HttpStatusCode.TooManyRequests:
                this.errorMsg =
                    'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                break;
            case HttpStatusCode.GatewayTimeout:
                this.errorMsg = 'Ein interner Fehler ist aufgetreten.';
                log.error('Laeuft der Appserver? Port-Forwarding?');
                break;
            default:
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
                break;
        }
    }

    #handleUpdateResult(result: Film | UpdateError) {
        if (!(result instanceof UpdateError)) {
            return;
        }

        const { statuscode } = result;
        log.debug(
            'UpdateStammdatenComponent.#handleError: statuscode=',
            statuscode,
        );

        switch (statuscode) {
            case HttpStatusCode.UnprocessableEntity: {
                const { cause } = result;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.errorMsg =
                    cause instanceof HttpErrorResponse
                        ? cause.error
                        : JSON.stringify(cause);
                break;
            }
            case HttpStatusCode.TooManyRequests:
                this.errorMsg =
                    'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                break;
            case HttpStatusCode.GatewayTimeout:
                this.errorMsg = 'Ein interner Fehler ist aufgetreten.';
                log.error('Laeuft der Appserver? Port-Forwarding?');
                break;
            default:
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
                break;
        }

        log.debug(
            'UpdateStammdatenComponent.#handleError: errorMsg=',
            this.errorMsg,
        );
    }

    async #navigateHome() {
        await this.router.navigate(['/']);
    }
}
