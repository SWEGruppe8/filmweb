import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-nachname&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    // moduleId: module.id,
    selector: 'hs-create-regisseur',
    templateUrl: './create-regisseur.component.html',
})
export class CreateRegisseurComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    private static readonly MIN_LENGTH_VORNAME = 5;

    private static readonly MAX_LENGTH_VORNAME = 5;

    @Input()
    createForm!: FormGroup;

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    readonly nachname = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateRegisseurComponent.MIN_LENGTH),
    ]);

    readonly vorname = new FormControl(undefined, [
        Validators.required,
        Validators.pattern('[0-9].*$'),
        Validators.minLength(CreateRegisseurComponent.MIN_LENGTH_VORNAME),
        Validators.maxLength(CreateRegisseurComponent.MAX_LENGTH_VORNAME),
    ]);
    // readonly kundeGroup = new FormGroup({ kunde: this.kunde })

    ngOnInit() {
        log.debug('CreateRegisseurComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('nachname', this.nachname);
        this.createForm.addControl('vorname', this.vorname);
    }
}
