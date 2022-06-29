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
    salma = false;

    leonardo = false;

    @Output()
    readonly salma$ = new Subject<boolean>();

    @Output()
    readonly leonardo$ = new Subject<boolean>();

    constructor() {
        log.debug('SucheSchauspielerComponent.constructor()');
    }

    onChangeSalma(event: Event) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-gruselig
        const { checked } = event.target as HTMLInputElement;
        log.debug(
            `SucheSchauspielerrComponent.onChangeSpannend: checked=${checked}`,
        );
        this.salma$.next(checked);
    }

    onChangeLeonardo(event: Event) {
        const { checked } = event.target as HTMLInputElement;
        log.debug(
            `SucheSchauspielerComponent.onChangeGruselig: checked=${checked}`,
        );
        this.leonardo$.next(checked);
    }
}
