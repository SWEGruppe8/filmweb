import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-bewertung</code>
 */
@Component({
    selector: 'hs-details-bewertung',
    templateUrl: './details-bewertung.component.html',
    styleUrls: ['./details-bewertung.component.scss'],
})
export class DetailsBewertungComponent implements OnInit {
    @Input()
    bewertung: number | undefined;

    counter: boolean[] = [];

    ngOnInit() {
        if (this.bewertung !== undefined) {
            for (let i = 0; i < this.bewertung; i++) {
                this.counter.push(true);
            }
        }
        log.debug('DetailsBewertungComponent.bewertung=', this.bewertung);
    }
}
