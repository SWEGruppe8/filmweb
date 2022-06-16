// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    type ActivatedRouteSnapshot,
    type CanActivate,
    Router,
    type RouterStateSnapshot,
    type UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Injectable } from '@angular/core';
import { type Observable } from 'rxjs';
import log from 'loglevel';

// https://angular.io/guide/router#can-activate-guard
// https://angular.io/api/router/CanActivate
// https://blog.angularindepth.com/new-in-angular-v7-1-updates-to-the-router-fd67d526ad05

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {
        log.debug('AdminGuard.constructor()');
    }

    canActivate(
        _: ActivatedRouteSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars
        __: RouterStateSnapshot, // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
    ):
        | Observable<UrlTree | boolean>
        | Promise<UrlTree | boolean>
        | UrlTree
        | boolean {
        if (this.authService.isAdmin) {
            log.debug('AdminGuard.canActivate: admin');
            return true;
        }

        log.debug('AdminGuard.canActivate: nicht "admin"');
        // Navigation wird abgebrochen ("cancelled") und zum neuen Pfad umgeleitet
        return this.router.createUrlTree(['/']);
    }
}
