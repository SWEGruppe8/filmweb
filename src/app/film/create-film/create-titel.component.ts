import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-titel&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Film zu realisieren.
 */
@Component({
    // moduleId: module.id,
    selector: 'hs-create-titel',
    templateUrl: './create-titel.component.html',
})
export class CreateTitelComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    @Input()
    createForm!: FormGroup;

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    readonly titel = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateTitelComponent.MIN_LENGTH),
        Validators.pattern(/^\w/u),
    ]);
    // readonly titelGroup = new FormGroup({ titel: this.titel })

    ngOnInit() {
        log.debug('CreateTitelComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('titel', this.titel);
    }
}
