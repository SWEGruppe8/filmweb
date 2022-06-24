import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-studio&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Film zu realisieren.
 */
@Component({
    selector: 'hs-create-studio',
    templateUrl: './create-studio.component.html',
})
export class CreateStudioComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly studio = new FormControl(undefined, Validators.required);

    ngOnInit() {
        log.debug('CreateStudioComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('studio', this.studio);
    }
}
