import { BalkendiagrammComponent } from './balkendiagramm.component';
import { LiniendiagrammComponent } from './liniendiagramm.component';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { TortendiagrammComponent } from './tortendiagramm.component';

@NgModule({
    imports: [NgxChartsModule, SharedModule],
    declarations: [
        BalkendiagrammComponent,
        LiniendiagrammComponent,
        TortendiagrammComponent,
    ],
    providers: [Title],
})
export class DiagrammeModule {}
