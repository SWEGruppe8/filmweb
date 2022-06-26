import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-schlagwoerter&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Film zu realisieren.
 */
@Component({
    selector: 'hs-create-schlagwoerter',
    templateUrl: './create-schlagwoerter.component.html',
})
export class CreateSchlagwoerterComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly spannend = new FormControl(false);

    readonly gruselig = new FormControl(false);

    ngOnInit() {
        log.debug('CreateSchlagwoerterComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('spannend', this.spannend);
        this.createForm.addControl('gruselig', this.gruselig);
    }
}
