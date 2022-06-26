import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CreateFilmComponent } from './create-film.component';
import { CreateGenreComponent } from './create-genre.component';
import { CreateIsanComponent } from './create-isan.component';
import { CreateNewsletterComponent } from './create-newsletter.component';
import { CreateRatingComponent } from './create-rating.component';
import { CreateReleaseComponent } from './create-release.component';
import { CreateSchlagwoerterComponent } from './create-schlagwoerter.component';
import { CreateStudioComponent } from './create-studio.component';
import { CreateTitelComponent } from './create-titel.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// Ein Modul enthaelt logisch zusammengehoerige Funktionalitaet.
// Exportierte Komponenten koennen bei einem importierenden Modul in dessen
// Komponenten innerhalb deren Templates (= HTML-Fragmente) genutzt werden.
// FilmModule ist ein "FeatureModule", das Features fuer Buecher bereitstellt
@NgModule({
    imports: [
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        SharedModule,
    ],
    declarations: [
        CreateFilmComponent,
        CreateGenreComponent,
        CreateIsanComponent,
        CreateNewsletterComponent,
        CreateRatingComponent,
        CreateReleaseComponent,
        CreateSchlagwoerterComponent,
        CreateStudioComponent,
        CreateTitelComponent,
    ],
    providers: [Title],
})
export class CreateFilmModule {}
