import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-suche-schlagwoerter</code>
 */
@Component({
    selector: 'hs-suche-schlagwoerter',
    templateUrl: './suche-schlagwoerter.component.html',
})
export class SucheSchlagwoerterrComponent {
    spannend = false;

    gruselig = false;

    @Output()
    readonly spannend$ = new Subject<boolean>();

    @Output()
    readonly gruselig$ = new Subject<boolean>();

    constructor() {
        log.debug('SucheSchlagwoerterComponent.constructor()');
    }

    onChangeSpannend(event: Event) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-gruselig
        const { checked } = event.target as HTMLInputElement;
        log.debug(
            `SucheSchlagwoerterComponent.onChangeSpannend: checked=${checked}`,
        );
        this.spannend$.next(checked);
    }

    onChangeGruselig(event: Event) {
        const { checked } = event.target as HTMLInputElement;
        log.debug(
            `SucheSchlagwoerterComponent.onChangeGruselig: checked=${checked}`,
        );
        this.gruselig$.next(checked);
    }
}
