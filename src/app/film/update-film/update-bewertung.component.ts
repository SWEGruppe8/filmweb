import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-bewertung</code>
 */
@Component({
    selector: 'hs-update-bewertung',
    templateUrl: './update-bewertung.component.html',
})
export class UpdateBewertungComponent implements OnInit {
    // <hs-update-bewertung [form]="form" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue: number | undefined;

    bewertung!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateBewertungComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.bewertung = new FormControl(this.currentValue);
        this.updateForm.addControl('bewertung', this.bewertung);
    }
}
