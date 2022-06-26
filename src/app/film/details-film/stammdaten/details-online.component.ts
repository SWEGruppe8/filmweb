import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-online</code>
 */
@Component({
    selector: 'hs-details-online',
    templateUrl: './details-online.component.html',
})
export class DetailsOnlineComponent implements OnInit {
    @Input()
    online: boolean | undefined;

    ngOnInit() {
        log.debug('DetailsOnlineComponent.online=', this.online);
    }
}
