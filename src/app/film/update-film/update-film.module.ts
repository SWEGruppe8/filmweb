import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { UpdateFilmComponent } from './update-film.component';
import { UpdateGenreComponent } from './update-genre.component';
import { UpdateIsanComponent } from './update-isan.component';
import { UpdateRatingComponent } from './update-rating.component';
import { UpdateStudioComponent } from './update-studio.component';
import { UpdateTitelComponent } from './update-titel.component';

@NgModule({
    imports: [SharedModule],
    declarations: [
        UpdateFilmComponent,
        UpdateGenreComponent,
        UpdateIsanComponent,
        UpdateRatingComponent,
        UpdateStudioComponent,
        UpdateTitelComponent,
    ],
    providers: [Title],
})
export class UpdateFilmModule {}
