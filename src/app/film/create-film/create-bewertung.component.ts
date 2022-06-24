import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-bewertung&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Film zu realisieren.
 */
@Component({
    selector: 'hs-create-bewertung',
    templateUrl: './create-bewertung.component.html',
})
export class CreateBewertungComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly bewertung = new FormControl(undefined);

    ngOnInit() {
        log.debug('CreateBewertungComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('bewertung', this.bewertung);
    }
}
