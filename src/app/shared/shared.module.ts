/*
 * Copyright (C) 2019 - present Juergen Zimmermann, Hochschule Karlsruhe
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
// https://angular.io/guide/sharing-ngmodules

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WaitingComponent } from './waiting.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ErrorMessageComponent, WaitingComponent],
    // *NICHT* BrowserAnimationsModule, weil dort BrowserModule importiert wird
    exports: [
        // *ngIf="...", *ngFor="...", *ngSwitch="..."
        CommonModule,
        ErrorMessageComponent,
        // [(ngModel)]="..."
        FormsModule,
        // [formGroup]="..."
        ReactiveFormsModule,
        // [routerLink]="...", [state]="...", <router-outlet>
        RouterModule,
        WaitingComponent,
    ],
})
export class SharedModule {}
