
import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-schlagwoerter</code>
 */
@Component({
    selector: 'hs-details-schlagwoerter',
    templateUrl: './details-schlagwoerter.component.html',
})
export class DetailsSchlagwoerterComponent implements OnInit {
    // <hs-schlagwoerter [values]="buch.schlagwoerter">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    values!: string[];

    ngOnInit() {
        log.debug('DetailsSchlagwoerterComponent.values=', this.values);
    }
}
