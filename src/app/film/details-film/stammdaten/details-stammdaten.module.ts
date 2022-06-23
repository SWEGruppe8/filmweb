import { DetailsGenreComponent } from './details-genre.component';
import { DetailsBewertungComponent } from './details-bewertung.component';
import { DetailsReleaseComponent } from './details-release.component';
import { DetailsIsanComponent } from './details-isan.component';
import { DetailsNewsletterComponent } from './details-newsletter.component';
import { DetailsUmsatzComponent } from './details-umsatz.component';
import { DetailsRegisseurComponent } from './details-regisseur.component';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { DetailsTitelComponent } from './details-titel.component';
import { DetailsStudioComponent } from './details-studio.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [
        DetailsGenreComponent,
        DetailsBewertungComponent,
        DetailsReleaseComponent,
        DetailsIsanComponent,
        DetailsNewsletterComponent,
        DetailsUmsatzComponent,
        DetailsRegisseurComponent,
        DetailsStammdatenComponent,
        DetailsTitelComponent,
        DetailsStudioComponent,
    ],
    exports: [DetailsStammdatenComponent],
})
export class DetailsStammdatenModule {}
