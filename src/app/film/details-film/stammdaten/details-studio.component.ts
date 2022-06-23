import { Component, Input, type OnInit } from '@angular/core';
import { type Studio } from '../../shared/film';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-studio</code>
 */
@Component({
    selector: 'hs-details-studio',
    templateUrl: './details-studio.component.html',
})
export class DetailsStudioComponent implements OnInit {
    @Input()
    studio: Studio | '' | undefined;

    ngOnInit() {
        log.debug('DetailsStudioComponent.studio=', this.studio);
    }
}
