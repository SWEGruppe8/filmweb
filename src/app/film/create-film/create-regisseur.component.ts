import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-regisseur&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Film zu realisieren.
 */
@Component({
    selector: 'hs-create-regisseur',
    templateUrl: './create-regisseur.component.html',
})
export class CreateRegisseurComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly regisseur = new FormControl(undefined, Validators.required);

    ngOnInit() {
        log.debug('CreateRegisseurComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('regisseur', this.regisseur);
    }
}
