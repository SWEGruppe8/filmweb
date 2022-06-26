import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-homepage</code>
 */
@Component({
    selector: 'hs-details-homepage',
    templateUrl: './details-homepage.component.html',
})
export class DetailsHomepageComponent implements OnInit {
    @Input()
    homepage!: string;

    ngOnInit() {
        log.debug('DetailsHomepageComponent.homepage=', this.homepage);
    }
}
