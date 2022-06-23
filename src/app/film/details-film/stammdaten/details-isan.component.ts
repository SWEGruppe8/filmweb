import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-isan</code>
 */
@Component({
    selector: 'hs-details-isan',
    templateUrl: './details-isan.component.html',
})
export class DetailsIsbnComponent implements OnInit {
    @Input()
    isan!: string;

    ngOnInit() {
        log.debug('DetailsIsanComponent.isan=', this.isan);
    }
}
