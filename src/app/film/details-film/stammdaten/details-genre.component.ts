import { Component, Input, type OnInit } from '@angular/core';
import { type FilmGenre } from '../../shared/film';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-genre</code>
 */
@Component({
    selector: 'hs-details-genre',
    templateUrl: './details-genre.component.html',
})
export class DetailsGenreComponent implements OnInit {
    @Input()
    genre!: FilmGenre;

    ngOnInit() {
        log.debug('DetailsGenreComponent.genre=', this.genre);
    }
}
