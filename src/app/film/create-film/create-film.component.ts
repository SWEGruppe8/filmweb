import { Component, type OnInit } from '@angular/core';
import { type FilmForm, toFilm } from './filmForm';
import { FilmWriteService, SaveError } from '../shared'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;create-film&gt;, um das Erfassungsformular
 * f&uuml;r einen neuer Film zu realisieren.
 */
@Component({
    selector: 'hs-create-film',
    templateUrl: './create-film.component.html',
})
export class CreateFilmComponent implements OnInit {
    readonly createForm = new FormGroup({});

    showWarning = false;

    fertig = false;

    errorMsg: string | undefined = undefined;

    constructor(
        private readonly service: FilmWriteService,
        private readonly router: Router,
        private readonly titleService: Title,
    ) {
        log.debug(
            'CreateFilmComponent.constructor: Injizierter Router:',
            router,
        );
    }

    ngOnInit() {
        this.titleService.setTitle('Neuer Film');
    }

    /**
     * Die Methode <code>onSubmit</code> realisiert den Event-Handler, wenn das
     * Formular abgeschickt wird, um einen neuen Film anzulegen.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    onSubmit() {
        // In einem Control oder in einer FormGroup gibt es u.a. folgende
        // Properties
        //    value     JSON-Objekt mit den IDs aus der FormGroup als
        //              Schluessel und den zugehoerigen Werten
        //    errors    Map<string,any> mit den Fehlern, z.B. {'required': true}
        //    valid/invalid     fuer valide Werte
        //    dirty/pristine    falls der Wert geaendert wurde

        if (this.createForm.invalid) {
            log.debug(
                'CreateFilmComponent.onSave: Validierungsfehler',
                this.createForm,
            );
        }

        const filmForm = this.createForm.value as FilmForm;
        const neuerFilm = toFilm(filmForm);
        log.debug('CreateFilmComponent.onSave: neuerFilm=', neuerFilm);

        this.service
            .save(neuerFilm)
            .pipe(
                // 1. Datensatz empfangen und danach implizites "unsubscribe"
                first(),
                tap(result => this.#setProps(result)),
            )
            // asynchrone Funktionen nur bei subscribe, nicht bei tap
            .subscribe({ next: () => this.#navigateHome() });
    }

    #setProps(result: SaveError | string) {
        if (result instanceof SaveError) {
            this.#handleError(result);
            return;
        }

        this.fertig = true;
        this.showWarning = false;
        this.errorMsg = undefined;

        const id = result;
        log.debug('CreateFilmComponent.#setProps: id=', id);
    }

    #handleError(err: SaveError) {
        const { statuscode } = err;
        log.debug(
            `CreateFilmComponent.#handleError: statuscode=${statuscode}, err=`,
            err,
        );

        switch (statuscode) {
            case HttpStatusCode.UnprocessableEntity: {
                const { cause } = err;
                // TODO Aufbereitung der Fehlermeldung: u.a. Anfuehrungszeichen
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
    }

    async #navigateHome() {
        if (this.errorMsg === undefined) {
            log.debug('CreateFilmComponent.#navigateHome: Navigation');
            await this.router.navigate(['/']);
        }
    }
}
