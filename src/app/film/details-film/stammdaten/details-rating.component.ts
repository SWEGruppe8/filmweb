import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-rating</code>
 */
@Component({
    selector: 'hs-details-rating',
    templateUrl: './details-rating.component.html',
    styleUrls: ['./details-rating.component.scss'],
})
export class DetailsRatingComponent implements OnInit {
    @Input()
    rating: number | undefined;

    counter: boolean[] = [];

    ngOnInit() {
        if (this.rating !== undefined) {
            for (let i = 0; i < this.rating; i++) {
                this.counter.push(true);
            }
        }
        log.debug('DetailsRatingComponent.rating=', this.rating);
    }
}
