import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SucheFilmeComponent } from './suche-filme.component';
import { SuchergebnisModule } from './suchergebnis/suchergebnis.module';
import { SuchformularModule } from './suchformular/suchformular.module';
import { Title } from '@angular/platform-browser';

// Ein Modul enthaelt logisch zusammengehoerige Funktionalitaet.
// Exportierte Komponenten koennen bei einem importierenden Modul in dessen
// Komponenten innerhalb deren Templates (= HTML-Fragmente) genutzt werden.
// SucheFilmeModule ist ein "FeatureModule", das Features fuer die Suche nach
// Filme bereitstellt
@NgModule({
    imports: [SharedModule, SuchergebnisModule, SuchformularModule],
    declarations: [SucheFilmeComponent],
    providers: [Title],
})
export class SucheFilmeModule {}
