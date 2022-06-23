import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-titel</code>
 */
@Component({
    selector: 'hs-details-titel',
    templateUrl: './details-titel.component.html',
})
export class DetailsTitelComponent implements OnInit {
    @Input()
    titel!: string;

    ngOnInit() {
        log.debug('DetailsTitelComponent.titel=', this.titel);
    }
}
