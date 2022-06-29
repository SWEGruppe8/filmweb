import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SucheGenreComponent } from './suche-genre.component';
import { SucheSchauspielerComponent } from './suche-schauspieler.component';
import { SucheStudioComponent } from './suche-studio.component';
import { SucheTitelComponent } from './suche-titel.component';

import { SuchformularComponent } from './suchformular.component';

@NgModule({
    imports: [SharedModule],
    declarations: [
        SucheGenreComponent,
        SucheSchauspielerComponent,
        SucheStudioComponent,
        SucheTitelComponent,
        SuchformularComponent,
    ],
    exports: [SuchformularComponent],
})
export class SuchformularModule {}
