import { Component, Input, type OnInit } from '@angular/core';
import { type Regisseur } from '../../shared/film';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-regisseur</code>
 */
@Component({
    selector: 'hs-details-regisseur',
    templateUrl: './details-regisseur.component.html',
})
export class DetailsRegisseurComponent implements OnInit {
    @Input()
    regisseur!: Regisseur;

    ngOnInit() {
        log.debug('DetailsRegisseurComponent.regisseur=', this.regisseur);
    }
}
