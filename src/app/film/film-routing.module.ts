import { RouterModule, type Routes } from '@angular/router';
import { AdminGuard } from '../auth/admin.guard';
import { BalkendiagrammComponent } from './diagramme/balkendiagramm.component';
import { FilmModule } from './film.module';
import { CreateFilmComponent } from './create-film/create-film.component';
import { CreateFilmGuard } from './create-film/create-film.guard';
import { DetailsFilmComponent } from './details-film/details-film.component';
import { LiniendiagrammComponent } from './diagramme/liniendiagramm.component';
import { NgModule } from '@angular/core';
import { SucheFilmeComponent } from './suche-filme/suche-filme.component';
import { TortendiagrammComponent } from './diagramme/tortendiagramm.component';
import { UpdateFilmComponent } from './update-film/update-film.component';

// Route-Definitionen fuer das Feature-Modul "film":
// Zuordnung von Pfaden und Komponenten mit HTML-Templates
const routes: Routes = [
    {
        path: 'suche',
        component: SucheFilmeComponent,
    },
    {
        path: 'create',
        component: CreateFilmComponent,
        canActivate: [AdminGuard],
        canDeactivate: [CreateFilmGuard],
    },
    {
        path: 'balkendiagramm',
        component: BalkendiagrammComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'liniendiagramm',
        component: LiniendiagrammComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'tortendiagramm',
        component: TortendiagrammComponent,
        canActivate: [AdminGuard],
    },

    // id als Pfad-Parameter
    {
        path: 'update/:id',
        component: UpdateFilmComponent,
        canActivate: [AdminGuard],
    },
    {
        path: ':id',
        component: DetailsFilmComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), FilmModule],
    exports: [RouterModule],
})
export class FilmRoutingModule {}
