
import { DetailsSchlagwoerterComponent } from './details-schlagwoerter.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [DetailsSchlagwoerterComponent],
    exports: [DetailsSchlagwoerterComponent],
})
export class DetailsSchlagwoerterModule {}
