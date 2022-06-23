import { GefundeneFilmeComponent } from './gefundene-filme.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [GefundeneFilmeComponent],
    exports: [GefundeneFilmeComponent],
})
export class GefundeneFilmeModule {}
