import { CreateFilmModule } from './create-film/create-film.module';
import { DetailsFilmModule } from './details-film/details-film.module';
import { DiagrammeModule } from './diagramme/diagramme.module';
import { NgModule } from '@angular/core';
import { SucheFilmeModule } from './suche-filme/suche-filme.module';
import { UpdateBuchModule } from './update-film/update-film.module';

@NgModule({
    imports: [
        CreateFilmModule,
        DetailsFilmModule,
        DiagrammeModule,
        SucheFilmeModule,
        UpdateFilmModule,
    ],
})
export class FilmModule {}
