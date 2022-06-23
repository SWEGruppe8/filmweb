/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable max-classes-per-file */

import { AuthService, ROLLE_ADMIN } from '../../../auth/auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    type Film,
    FilmReadService,
    FilmWriteService,
    RemoveError,
} from '../../shared';
import { Component, Input, type OnInit } from '@angular/core';
import { easeIn, easeOut } from '../../../shared';
import { first, tap } from 'rxjs/operators';
import { NgLocalization } from '@angular/common';
import { Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-gefundene-filme</code>, um zun&auml;chst
 * das Warten und danach das Ergebnis der Suche anzuzeigen, d.h. die gefundenen
 * B&uuml;cher oder eine Fehlermeldung.
 */
@Component({
    selector: 'hs-gefundene-filme',
    templateUrl: './gefundene-filme.component.html',
    animations: [easeIn, easeOut],
})
export class GefundeneFilmeComponent implements OnInit {
    // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
    // eine Flux-Bibliothek wie beispielsweise Redux http://redux.js.org

    // Property Binding: <hs-gefundene-filme [filme]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    filme: Film[] = [];

    isAdmin!: boolean;

    // nachtraegliches Einloggen mit der Rolle "admin" beobachten
    isAdmin$ = new Subject<boolean>();

    // Parameter Properties (Empfehlung: Konstruktor nur fuer DI)
    // eslint-disable-next-line max-params
    constructor(
        private readonly service: FilmReadService,
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly writeService: FilmWriteService,
    ) {
        log.debug('GefundeneFilmeComponent.constructor()');
    }

    // Attribute mit @Input() sind undefined im Konstruktor.
    // Methode zum "LifeCycle Hook" OnInit: wird direkt nach dem Konstruktor
    // aufgerufen.
    // Weitere Methoden zum Lifecycle: ngAfterViewInit(), ngAfterContentInit()
    // https://angular.io/docs/ts/latest/guide/cheatsheet.html
    // Die Ableitung vom Interface OnInit ist nicht notwendig, aber erleichtert
    // IntelliSense bei der Verwendung von TypeScript.
    ngOnInit() {
        log.debug('GefundeneFilmeComponent.ngOnInit()');
        this.isAdmin = this.authService.isAdmin;

        this.authService.rollen$
            .pipe(
                first(),
                tap((rollen: string[]) =>
                    // ein neues Observable vom Typ boolean
                    this.isAdmin$.next(rollen.includes(ROLLE_ADMIN)),
                ),
            )
            // das Subject von AuthService abonnieren bzw. beobachten
            .subscribe();
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Film in der Detailsseite anzeigen.
     * @param film Das ausgew&auml;hlte Film
     */
    onClick(film: Film) {
        log.debug('GefundeneFilmeComponent.onClick: film=', film);

        // URL mit der Film-ID, um ein Bookmark zu ermoeglichen
        // Gefundenes Film als NavigationExtras im Router puffern
        const state = { film };
        return this.router.navigate([`/filme/${film.id}`], { state });
    }

    /**
     * Das ausgew&auml;hlte bzw. angeklickte Film l&ouml;schen.
     * @param film Das ausgew&auml;hlte Film
     */
    onRemove(film: Film) {
        log.debug('GefundeneFilmeComponent.onRemove: film=', film);

        return this.writeService
            .remove(film)
            .pipe(
                first(),
                tap(result => {
                    if (result instanceof RemoveError) {
                        log.debug(
                            'GefundeneFilmeComponent.onRemove: statuscode=',
                            result.statuscode,
                        );
                        return;
                    }

                    this.filme = this.filme.filter(b => b.id !== film.id);
                }),
            )
            .subscribe();
    }

    trackBy(_index: number, film: Film) {
        return film.id;
    }
}

export class AnzahlLocalization extends NgLocalization {
    getPluralCategory(count: number) {
        return count === 1 ? 'single' : 'multi';
    }
}

/* eslint-enable max-classes-per-file */
