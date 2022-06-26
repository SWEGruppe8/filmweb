import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-rating</code>
 */
@Component({
    selector: 'hs-update-rating',
    templateUrl: './update-rating.component.html',
})
export class UpdateRatingComponent implements OnInit {
    // <hs-update-rating [form]="form" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue: number | undefined;

    rating!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateRating Component.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.rating = new FormControl(this.currentValue);
        this.updateForm.addControl('rating', this.rating);
    }
}
