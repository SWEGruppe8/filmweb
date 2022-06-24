import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-schauspieler&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Film zu realisieren.
 */
@Component({
    selector: 'hs-create-schauspieler',
    templateUrl: './create-schauspieler.component.html',
})
export class CreateSchauspielerComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly leonardo = new FormControl(false);

    readonly salma = new FormControl(false);

    ngOnInit() {
        log.debug('CreateSchauspielerComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('leonardo', this.leonardo);
        this.createForm.addControl('salma', this.salma);
    }
}
