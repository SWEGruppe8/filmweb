import { type FilmGenre, type Studio } from '../../shared/film';
import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { type Suchkriterien } from '../../shared';
import { fadeIn } from '../../../shared';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-suchformular</code>
 */
@Component({
    selector: 'hs-suchformular',
    templateUrl: './suchformular.component.html',
    animations: [fadeIn],
})
export class SuchformularComponent {
    // Event Binding: <hs-suchformular (suchkriterien$)="...">
    // in RxJS: Observables = Event-Streaming mit Promises
    // Subject fuer @Output: abgeleitet von Observable mit zusaetzl. Funktion next()
    // Ein Subject kann MEHRERE Observer benachrichtigen ("Multicast")
    // https://angular.io/guide/component-interaction#parent-listens-for-child-event
    // Suffix "$" wird als "Finnish Notation" bezeichnet https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b
    @Output()
    readonly suchkriterien$ = new Subject<Suchkriterien>();

    #titel = '';

    #studio: Studio | '' = '';

    #genre: FilmGenre | '' = '';

    #spannend = false;

    #gruselig = false;

    // DI: Constructor Injection (React hat uebrigens keine DI)
    // Empfehlung: Konstruktor nur fuer DI
    constructor() {
        log.debug('SuchformularComponent.constructor()');
    }

    setTitel(titel: string) {
        log.debug('SuchformularComponent.setTitel', titel);
        this.#titel = titel;
    }

    setStudio(studio: Studio | '') {
        log.debug('SuchformularComponent.setStudio', studio);
        this.#studio = studio;
    }

    setGenre(genre: string) {
        log.debug('SuchformularComponent.setGenre', genre);
        this.#genre = genre as FilmGenre;
    }

    setSpannend(isChecked: boolean) {
        log.debug('SuchformularComponent.setSpannend', isChecked);
        this.#spannend = isChecked;
    }

    setGruselig(isChecked: boolean) {
        log.debug('SuchformularComponent.setGruselig', isChecked);
        this.#gruselig = isChecked;
    }

    /**
     * Suche nach B&uuml;chern, die den spezfizierten Suchkriterien entsprechen
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    onSubmit() {
        log.debug(
            'SuchformularComponent.onSubmit: titel / studio / genre / spannend / gruselig',
            this.#titel,
            this.#studio,
            this.#genre,
            this.#spannend,
            this.#gruselig,
        );

        this.suchkriterien$.next({
            titel: this.#titel,
            studio: this.#studio,
            genre: this.#genre,
            schlagwoerter: {
                spannend: this.#spannend,
                gruselig: this.#gruselig,
            },
        });

        // Inspektion der Komponente mit dem Tag-Namen "app" im Debugger
        // Voraussetzung: globale Variable ng deklarieren (s.o.)
        // const app = document.querySelector('app')
        // global.ng.probe(app)

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite.
        return false;
    }
}
