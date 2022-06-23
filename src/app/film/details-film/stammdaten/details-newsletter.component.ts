import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-newsletter</code>
 */
@Component({
    selector: 'hs-details-lieferbar',
    templateUrl: './details-lieferbar.component.html',
})
export class DetailsLieferbarComponent implements OnInit {
    @Input()
    lieferbar: boolean | undefined;

    ngOnInit() {
        log.debug('DetailsNewsletterComponent.lieferbar=', this.lieferbar);
    }
}
