import { DetailsDatumComponent } from './details-datum.component';
import { DetailsGenreComponent } from './details-genre.component';
import { DetailsHomepageComponent } from './details-homepage.component';
import { DetailsOnlineComponent } from './details-online.component';
import { DetailsRatingComponent } from './details-rating.component';
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
        DetailsHomepageComponent,
        DetailsOnlineComponent,
        DetailsRatingComponent,
        DetailsStammdatenComponent,
        DetailsStudioComponent,
        DetailsTitelComponent,
    ],
    exports: [DetailsStammdatenComponent],
})
export class DetailsStammdatenModule {}
