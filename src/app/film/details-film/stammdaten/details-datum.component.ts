import { Component, Input, type OnInit } from '@angular/core';
import { type Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-datum</code>
 */
@Component({
    selector: 'hs-details-datum',
    templateUrl: './details-datum.component.html',
})
export class DetailsDatumComponent implements OnInit {
    @Input()
    datum: Temporal.PlainDate | undefined;

    ngOnInit() {
        log.debug('DetailsDatumComponent: datum=', this.datum);
    }
}
