import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-create-genre&gt;, um das Erfassungsformular
 * f&uuml;r einen neuen Film zu realisieren.
 */
@Component({
    selector: 'hs-create-genre',
    templateUrl: './create-genre.component.html',
})
export class CreateGenreComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly genre = new FormControl('L');

    ngOnInit() {
        log.debug('CreateGenreComponent.ngOnInit');
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.createForm.addControl('genre', this.genre);
    }
}
