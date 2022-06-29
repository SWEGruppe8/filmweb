import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { UpdateBewertungComponent } from './update-bewertung.component';
import { UpdateFilmComponent } from './update-film.component';
import { UpdateGenreComponent } from './update-genre.component';
import { UpdateHomepageComponent } from './update-homepage.component';
import { UpdateStudioComponent } from './update-studio.component';
import { UpdateTitelComponent } from './update-titel.component';

@NgModule({
    imports: [SharedModule],
    declarations: [
        UpdateBewertungComponent,
        UpdateFilmComponent,
        UpdateGenreComponent,
        UpdateHomepageComponent,
        UpdateStudioComponent,
        UpdateTitelComponent,
    ],
    providers: [Title],
})
export class UpdateFilmModule {}
