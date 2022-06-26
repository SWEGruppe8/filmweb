import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-online&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Film zu realisieren.
 */
@Component({
    selector: 'hs-create-online',
    templateUrl: './create-online.component.html',
})
export class CreateOnlineComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly online = new FormControl(false);

    ngOnInit() {
        log.debug('CreateOnlineComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('online', this.online);
    }
}
