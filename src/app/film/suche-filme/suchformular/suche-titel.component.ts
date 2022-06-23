import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-suche-titel</code>
 */
@Component({
    selector: 'hs-suche-titel',
    templateUrl: './suche-titel.component.html',
})
export class SucheTitelComponent {
    titel = '';

    // Event Binding: <hs-suche-titel (suchkriterien$)="...">
    // in RxJS: Observables für Event-Streaming
    // Subject fuer @Output: abgeleitet von Observable mit zusaetzl. Funktion next()
    // Ein Subject kann MEHRERE Observer benachrichtigen ("Multicast")
    // https://angular.io/guide/component-interaction#parent-listens-for-child-event
    // Suffix "$" wird als "Finnish Notation" bezeichnet https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b
    @Output()
    readonly titel$ = new Subject<string>();

    constructor() {
        log.debug('SucheTitelComponent.constructor()');
    }

    onBlur() {
        log.debug(`SucheTitelComponent.onBlur: titel=${this.titel}`);
        this.titel$.next(this.titel);
    }
}
