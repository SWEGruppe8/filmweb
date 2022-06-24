import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

// https://mattlewis92.github.io/angular-calendar/#/kitchen-sink

/**
 * Komponente mit dem Tag &lt;hs-create-release&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Film zu realisieren.
 */
@Component({
    selector: 'hs-create-release',
    templateUrl: './create-release.component.html',
})
export class CreateReleaseComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly today = new Date();

    readonly release = new FormControl(this.today);

    ngOnInit() {
        log.debug('CreateReleaseComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('release', this.release);
    }

    dayClicked({ date }: { date: Date }): void {
        log.debug('CreateReleaseComponent: dayClicked', date);
        this.createForm.setControl('release', new FormControl(date));
    }
}
