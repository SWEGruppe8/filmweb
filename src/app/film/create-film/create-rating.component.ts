import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-rating &gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Film zu realisieren.
 */
@Component({
    selector: 'hs-create-rating',
    templateUrl: './create-rating.component.html',
})
export class CreateRatingComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly rating = new FormControl(undefined);

    ngOnInit() {
        log.debug('CreateRating Component.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('rating', this.rating);
    }
}
