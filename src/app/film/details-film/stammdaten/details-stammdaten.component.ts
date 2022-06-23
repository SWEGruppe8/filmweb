import { Component, Input, type OnInit } from '@angular/core';
import { type Film } from '../../shared/film';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-stammdaten</code>
 */
@Component({
    selector: 'hs-details-stammdaten',
    templateUrl: './details-stammdaten.component.html',
})
export class DetailsStammdatenComponent implements OnInit {
    // Property Binding: <hs-details-stammdaten [film]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    film!: Film;

    ngOnInit() {
        log.debug('DetailsStammdatenComponent.film=', this.film);
    }
}
