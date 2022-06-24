import { DetailsSchauspielerComponent } from './details-schauspieler.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [DetailsSchauspielerComponent],
    exports: [DetailsSchauspielerComponent],
})
export class DetailsSchauspielerModule {}
