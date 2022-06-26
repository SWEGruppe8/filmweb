import { ActivatedRoute, Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, type OnInit } from '@angular/core';
import { type Film, FilmReadService } from '../shared'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { first, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { FindError } from '../shared/errors';
// eslint-disable-next-line import/no-unresolved
import { HttpStatusCode } from '@angular/common/http';
import { type Observable } from 'rxjs';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-film</code>
 */
@Component({
    selector: 'hs-details-film',
    templateUrl: './details-film.component.html',
})
export class DetailsFilmComponent implements OnInit {
    waiting = true;

    film: Film | undefined;

    errorMsg: string | undefined;

    isAdmin!: boolean;

    appstate$!: Observable<Record<string, unknown> | undefined>;

    // eslint-disable-next-line max-params
    constructor(
        private readonly service: FilmReadService,
        private readonly titleService: Title,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly authService: AuthService,
    ) {
        log.debug('DetailsFilmComponent.constructor()');

        // getCurrentNavigation() liefert undefined innerhalb von ngOnInit
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras.state as { film: Film } | undefined;
        this.film = state?.film;
        log.debug('DetailsFilmComponent.constructor: this.film=', this.film);
    }

    ngOnInit() {
        if (this.film === undefined) {
            log.debug('DetailsFilmComponent.ngOnInit: this.film === undefined');

            // Pfad-Parameter aus /filme/:id beobachten, ohne dass bisher ein
            // JavaScript-Ereignis, wie z.B. click, eingetreten ist.
            // Mongo-ID ist ein String
            const id = this.route.snapshot.paramMap.get('id') ?? undefined;
            log.debug('DetailsFilmComponent.ngOnInit: id=', id);

            this.service
                .findById(id)
                .pipe(
                    first(),
                    tap(result => this.#setProps(result)),
                )
                .subscribe();
        } else {
            this.waiting = false;
        }

        // Initialisierung, falls zwischenzeitlich der Browser geschlossen wurde
        this.isAdmin = this.authService.isAdmin;
    }

    #setProps(result: Film | FindError) {
        this.waiting = false;

        if (result instanceof FindError) {
            this.#handleError(result);
            return;
        }

        this.film = result;
        this.errorMsg = undefined;

        const titel = `Details ${this.film.id}`;
        this.titleService.setTitle(titel);
    }

    #handleError(err: FindError) {
        const { statuscode } = err;
        log.debug('DetailsComponent.handleError: statuscode=', statuscode);

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

        this.titleService.setTitle('Fehler');
    }
}
