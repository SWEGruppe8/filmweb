import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { UpdateGenreComponent } from './update-genre.component';
import { UpdateFilmComponent } from './update-film.component';
import { UpdateIsanComponent } from './update-isan.component';
import { UpdateBewertungComponent } from './update-bewertung.component';
import { UpdateTitelComponent } from './update-titel.component';
import { UpdateStudioComponent } from './update-studio.component';

@NgModule({
    imports: [SharedModule],
    declarations: [
        UpdateGenreComponent,
        UpdateFilmComponent,
        UpdateIsanComponent,
        UpdateBewertungComponent,
        UpdateTitelComponent,
        UpdateStudioComponent,
    ],
    providers: [Title],
})
export class UpdateFilmModule {}
