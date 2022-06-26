import { DetailsGenreComponent } from './details-genre.component';
import { DetailsIsanComponent } from './details-isan.component';
import { DetailsNewsletterComponent } from './details-newsletter.component';
import { DetailsRatingComponent } from './details-rating.component';
import { DetailsReleaseComponent } from './details-release.component';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { DetailsStudioComponent } from './details-studio.component';
import { DetailsTitelComponent } from './details-titel.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [
        DetailsGenreComponent,
        DetailsIsanComponent,
        DetailsNewsletterComponent,
        DetailsRatingComponent,
        DetailsReleaseComponent,
        DetailsStammdatenComponent,
        DetailsStudioComponent,
        DetailsTitelComponent,
    ],
    exports: [DetailsStammdatenComponent],
})
export class DetailsStammdatenModule {}
