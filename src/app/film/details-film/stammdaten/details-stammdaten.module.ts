import { DetailsBewertungComponent } from './details-bewertung.component';
import { DetailsGenreComponent } from './details-genre.component';
import { DetailsIsanComponent } from './details-isan.component';
import { DetailsNewsletterComponent } from './details-newsletter.component';
import { DetailsRegisseurComponent } from './details-regisseur.component';
import { DetailsReleaseComponent } from './details-release.component';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { DetailsStudioComponent } from './details-studio.component';
import { DetailsTitelComponent } from './details-titel.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [
        DetailsBewertungComponent,
        DetailsGenreComponent,
        DetailsIsanComponent,
        DetailsNewsletterComponent,
        DetailsRegisseurComponent,
        DetailsReleaseComponent,
        DetailsStammdatenComponent,
        DetailsStudioComponent,
        DetailsTitelComponent,
    ],
    exports: [DetailsStammdatenComponent],
})
export class DetailsStammdatenModule {}
