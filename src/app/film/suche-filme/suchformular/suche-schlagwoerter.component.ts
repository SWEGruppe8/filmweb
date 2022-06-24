import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-suche-schauspieler</code>
 */
@Component({
    selector: 'hs-suche-schauspieler',
    templateUrl: './suche-schauspieler.component.html',
})
export class SucheSchauspielerComponent {
    leonardo = false;

    salma = false;

    @Output()
    readonly leonardo$ = new Subject<boolean>();

    @Output()
    readonly salma$ = new Subject<boolean>();

    constructor() {
        log.debug('SucheSchauspielerComponent.constructor()');
    }

    onChangeLeonardo(event: Event) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-salma
        const { checked } = event.target as HTMLInputElement;
        log.debug(
            `SucheSchauspielerComponent.onChangeLeonardo: checked=${checked}`,
        );
        this.leonardo$.next(checked);
    }

    onChangeSalma(event: Event) {
        const { checked } = event.target as HTMLInputElement;
        log.debug(
            `SucheSchauspielerComponent.onChangeSalma: checked=${checked}`,
        );
        this.salma$.next(checked);
    }
}
