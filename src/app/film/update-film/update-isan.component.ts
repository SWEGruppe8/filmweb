import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import { ISAN_REGEX } from '../shared';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-isan</code>
 */
@Component({
    selector: 'hs-update-isan',
    templateUrl: './update-isan.component.html',
})
export class UpdateIsanComponent implements OnInit {
    // <hs-update-isan [form]="form" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: string;

    isan!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateIsanComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.isan = new FormControl(this.currentValue, [
            Validators.required,
            Validators.pattern(ISAN_REGEX),
        ]);
        this.updateForm.addControl('isan', this.isan);
    }
}
