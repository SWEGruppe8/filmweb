import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-schauspieler&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Film zu realisieren.
 */
@Component({
    selector: 'hs-create-schauspieler',
    templateUrl: './create-schauspieler.component.html',
})
export class CreateSchauspielerComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly spannend = new FormControl(false);

    readonly gruselig = new FormControl(false);

    ngOnInit() {
        log.debug('CreateschauspielerComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('spannend', this.spannend);
        this.createForm.addControl('gruselig', this.gruselig);
    }
}
