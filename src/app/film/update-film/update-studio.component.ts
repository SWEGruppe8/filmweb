import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import { type Studio } from '../shared/film';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-studio</code>
 */
@Component({
    selector: 'hs-update-studio',
    templateUrl: './update-studio.component.html',
})
export class UpdateStudioComponent implements OnInit {
    // <hs-update-studio [updateStammdatenform]="updateStammdatenform" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue: Studio | '' | undefined;

    studio!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateStudioComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.studio = new FormControl(this.currentValue);
        this.updateForm.addControl('studio', this.studio);
    }
}
