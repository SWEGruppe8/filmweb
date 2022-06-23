import { Component, Output } from '@angular/core';
import { type Studio } from '../../shared/film';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-suche-studio</code>
 */
@Component({
    selector: 'hs-suche-studio',
    templateUrl: './suche-studio.component.html',
})
export class SucheStudioComponent {
    studio: Studio | '' = '';

    @Output()
    readonly studio$ = new Subject<Studio | ''>();

    constructor() {
        log.debug('SucheStudioComponent.constructor()');
    }

    onChange(event: Event) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
        const { value } = event.target as HTMLSelectElement;
        log.debug('SucheStudioComponent.onChange: value=', value);
        this.studio$.next(value as Studio | '');
    }
}
