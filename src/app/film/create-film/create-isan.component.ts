import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import { ISAN_REGEX } from '../shared';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-isan&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Film zu realisieren.
 */
@Component({
    selector: 'hs-create-isan',
    templateUrl: './create-isan.component.html',
})
export class CreateIsanComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly isan = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(ISAN_REGEX),
    ]);

    ngOnInit() {
        log.debug('CreateIsanComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('isan', this.isan);
    }
}
