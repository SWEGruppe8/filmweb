
import { DetailsBearbeitenComponent } from './details-bearbeiten.component';
import { DetailsBreadcrumbsComponent } from './details-breadcrumbs.component';
import { DetailsFilmComponent } from './details-film.component';
import { DetailsSchlagwoerterModule } from './schlagwoerter/details-schlagwoerter.module';
import { DetailsStammdatenModule } from './stammdaten/details-stammdaten.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';

@NgModule({
    imports: [
        DetailsSchlagwoerterModule,
        DetailsStammdatenModule,
        SharedModule,
    ],
    declarations: [
        DetailsBearbeitenComponent,
        DetailsBreadcrumbsComponent,
        DetailsFilmComponent,
    ],
    providers: [Title],
})
export class DetailsFilmModule {}
