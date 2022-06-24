import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-schauspieler</code>
 */
@Component({
    selector: 'hs-details-schauspieler',
    templateUrl: './details-schauspieler.component.html',
})
export class DetailsSchauspielerComponent implements OnInit {
    // <hs-schauspieler [values]="film.schauspieler">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    values!: string[];

    ngOnInit() {
        log.debug('DetailsSchauspielerComponent.values=', this.values);
    }
}
