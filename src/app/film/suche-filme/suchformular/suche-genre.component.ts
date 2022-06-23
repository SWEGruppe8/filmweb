import { Component, Output } from '@angular/core';
import { type FilmGenre } from '../../shared/film';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-suche-genre</code>
 */
@Component({
    selector: 'hs-suche-genre',
    templateUrl: './suche-genre.component.html',
})
export class SucheGenreComponent {
    genre: FilmGenre | '' = '';

    @Output()
    readonly genre$ = new Subject<FilmGenre | ''>();

    constructor() {
        log.debug('SucheGenreComponent.constructor()');
    }

    onChange(event: Event) {
        // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
        const { value } = event.target as HTMLInputElement;
        log.debug(`SucheGenreComponent.onChange: genre=${value}`);
        this.genre$.next(value as FilmGenre | '');
    }
}
