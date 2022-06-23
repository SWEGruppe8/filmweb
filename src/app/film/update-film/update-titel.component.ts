import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-titel</code>
 */
@Component({
    selector: 'hs-update-titel',
    templateUrl: './update-titel.component.html',
})
export class UpdateTitelComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    // <hs-update-titel [form]="form" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: string;

    titel!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateTitelComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.titel = new FormControl(this.currentValue, [
            Validators.required,
            Validators.minLength(UpdateTitelComponent.MIN_LENGTH),
            Validators.pattern(/^\w/u),
        ]);
        this.updateForm.addControl('titel', this.titel);
    }
}
