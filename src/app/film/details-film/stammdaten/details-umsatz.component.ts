import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-umsatz</code>
 */
@Component({
    selector: 'hs-details-umsatz',
    templateUrl: './details-umsatz.component.html',
})
export class DetailsUmsatzComponent implements OnInit {
    @Input()
    umsatz!: number | '';

    ngOnInit() {
        log.debug('DetailsUmsatzComponent.umsatz=', this.umsatz);
    }
}
