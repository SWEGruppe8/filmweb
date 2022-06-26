import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import { HOMEPAGE_REGEX } from '../shared';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-homepage&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Film zu realisieren.
 */
@Component({
    selector: 'hs-create-homepage',
    templateUrl: './create-homepage.component.html',
})
export class CreateHomepageComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly homepage = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(HOMEPAGE_REGEX),
    ]);

    ngOnInit() {
        log.debug('CreateHomepageComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('homepage', this.homepage);
    }
}
