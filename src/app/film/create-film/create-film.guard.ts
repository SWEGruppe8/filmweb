import {
    type ActivatedRouteSnapshot,
    type CanDeactivate,
    type RouterStateSnapshot,
    type UrlTree,
} from '@angular/router';
import { type CreateFilmComponent } from './create-film.component';
import { Injectable } from '@angular/core';
import { type Observable } from 'rxjs';
import log from 'loglevel';

// https://angular.io/api/router/CanDeactivate
// https://angular.io/guide/router#can-deactivate-guard

@Injectable({ providedIn: 'root' })
export class CreateFilmGuard implements CanDeactivate<CreateFilmComponent> {
    constructor() {
        log.debug('CreateFilmGuard.constructor()');
    }

    canDeactivate(
        createFilm: CreateFilmComponent,
        _: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
        __: RouterStateSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
    ):
        | Observable<UrlTree | boolean>
        | Promise<UrlTree | boolean>
        | UrlTree
        | boolean {
        if (createFilm.fertig) {
            // Seite darf zur gewuenschten URL verlassen werden
            return true;
        }

        createFilm.showWarning = true;
        createFilm.fertig = true;
        log.debug('CreateFilmGuard.canDeactivate: Verlassen der Seite');
        return false;
    }
}
