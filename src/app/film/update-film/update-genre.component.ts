import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import { type FilmGenre } from '../shared/film';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-genre</code>
 */
@Component({
    selector: 'hs-update-genre',
    templateUrl: './update-genre.component.html',
})
export class UpdateGenreComponent implements OnInit {
    // <hs-update-genre [form]="form" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: FilmGenre;

    genre!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateGenreComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.genre = new FormControl(this.currentValue, Validators.required);
        this.updateForm.addControl('genre', this.genre);
    }
}
