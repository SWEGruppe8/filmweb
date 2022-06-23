import { GefundeneFilmeModule } from '../gefundene-filme/gefundene-filme.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SuchergebnisComponent } from './suchergebnis.component';

@NgModule({
    imports: [GefundeneFilmeModule, SharedModule],
    declarations: [SuchergebnisComponent],
    exports: [SuchergebnisComponent],
})
export class SuchergebnisModule {}
