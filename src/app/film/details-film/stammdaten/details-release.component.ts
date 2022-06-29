import { Component, Input, type OnInit } from '@angular/core';
import { type Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-release</code>
 */
@Component({
    selector: 'hs-details-release',
    templateUrl: './details-release.component.html',
})
export class DetailsReleaseComponent implements OnInit {
    @Input()
    release: Temporal.PlainDate | undefined;

    ngOnInit() {
        log.debug('DetailsReleaseComponent: release=', this.release);
    }
}
