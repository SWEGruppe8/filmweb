import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

// https://mattlewis92.github.io/angular-calendar/#/kitchen-sink

/**
 * Komponente mit dem Tag &lt;hs-create-datum&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Film zu realisieren.
 */
@Component({
    selector: 'hs-create-datum',
    templateUrl: './create-datum.component.html',
})
export class CreateDatumComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly today = new Date();

    readonly datum = new FormControl(this.today);

    ngOnInit() {
        log.debug('CreateDatumComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('datum', this.datum);
    }

    dayClicked({ date }: { date: Date }): void {
        log.debug('CreateDatumComponent: dayClicked', date);
        this.createForm.setControl('datum', new FormControl(date));
    }
}
