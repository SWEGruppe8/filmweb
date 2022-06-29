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
export class CreateschauspielerComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly salma = new FormControl(false);

    readonly leonardo = new FormControl(false);

    ngOnInit() {
        log.debug('CreateschauspielerComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('salma', this.salma);
        this.createForm.addControl('leonardo', this.leonardo);
    }
}
