import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import { HOMEPAGE_REGEX } from '../shared';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-homepage</code>
 */
@Component({
    selector: 'hs-update-homepage',
    templateUrl: './update-homepage.component.html',
})
export class UpdateHomepageComponent implements OnInit {
    // <hs-update-homepage [form]="form" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: string;

    homepage!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateHomepageComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.homepage = new FormControl(this.currentValue, [
            Validators.required,
            Validators.pattern(HOMEPAGE_REGEX),
        ]);
        this.updateForm.addControl('homepage', this.homepage);
    }
}
