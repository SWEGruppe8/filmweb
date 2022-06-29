import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-umsatz&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Film zu realisieren.
 */
@Component({
    selector: 'hs-create-umsatz',
    templateUrl: './create-umsatz.component.html',
})
export class CreateUmsatzComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly umsatz = new FormControl(undefined, Validators.required);

    ngOnInit() {
        log.debug('CreateUmsatzComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('umsatz', this.umsatz);
    }
}
