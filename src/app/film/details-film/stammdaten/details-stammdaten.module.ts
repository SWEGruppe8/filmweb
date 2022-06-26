import { DetailsDatumComponent } from './details-datum.component';
import { DetailsGenreComponent } from './details-genre.component';
import { DetailsIsanComponent } from './details-isan.component';
import { DetailsNewsletterComponent } from './details-newsletter.component';
import { DetailsRatingComponent } from './details-rating.component';
import { DetailsRegisseurComponent } from './details-regisseur.component';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { DetailsStudioComponent } from './details-studio.component';
import { DetailsTitelComponent } from './details-titel.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [
        DetailsDatumComponent,
        DetailsGenreComponent,
        DetailsIsanComponent,
        DetailsNewsletterComponent,
        DetailsRatingComponent,
        DetailsRegisseurComponent,
        DetailsStammdatenComponent,
        DetailsStudioComponent,
        DetailsTitelComponent,
    ],
    exports: [DetailsStammdatenComponent],
})
export class DetailsStammdatenModule {}
