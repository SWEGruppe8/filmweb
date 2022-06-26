import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SucheGenreComponent } from './suche-genre.component';
import { SucheSchlagwoerterComponent } from './suche-schlagwoerter.component';
import { SucheStudioComponent } from './suche-studio.component';
import { SucheTitelComponent } from './suche-titel.component';

import { SuchformularComponent } from './suchformular.component';

@NgModule({
    imports: [SharedModule],
    declarations: [
        SucheGenreComponent,
        SucheSchlagwoerterComponent,
        SucheStudioComponent,
        SucheTitelComponent,
        SuchformularComponent,
    ],
    exports: [SuchformularComponent],
})
export class SuchformularModule {}
