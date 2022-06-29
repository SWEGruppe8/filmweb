import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';
// eslint-disable-next-line sort-imports
import type { Umsatz } from '../../shared/film';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-umsatz</code>
 */
@Component({
    selector: 'hs-details-umsatz',
    templateUrl: './details-umsatz.component.html',
})
export class DetailsUmsatzComponent implements OnInit {
    @Input()
    umsatz!: Umsatz | { waehrung: ''; betrag: 0 };

    ngOnInit() {
        log.debug('DetailsUmsatzComponent.umsatz=', this.umsatz);
    }
}
