
import { type Film, FilmReadService, FindError } from '../shared'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, type OnInit } from '@angular/core';
import { first, map, tap } from 'rxjs/operators';
import { type DataItem } from '@swimlane/ngx-charts';
import { KeineFilmeError } from './errors';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

// D3 (= Data Driven Documents) https://d3js.org ist das fuehrende Produkt
// fuer Datenvisualisierung:
//  initiale Version durch die Dissertation von Mike Bostock
//  gesponsort von der New York Times, seinem heutigen Arbeitgeber
//  basiert auf SVG = scalable vector graphics: Punkte, Linien, Kurven, ...
//  ca 250.000 Downloads/Monat bei https://www.npmjs.com
//  https://github.com/mbostock/d3 mit ueber 100 Contributors

// Alternativen:
// ngx-charts:    https://swimlane.gitbook.io/ngx-charts
// Google Charts: https://google-developers.appspot.com/chart
// Chart.js:      https://github.com/nnnick/Chart.js
// Chartist.js:   http://gionkunz.github.io/chartist-js
// n3-chart:      http://n3-charts.github.io/line-chart

// https://www.ngdevelop.tech/best-angular-chart-libraries
// https://openbase.io/packages/top-angular-chart-libraries

/**
 * Komponente mit dem Tag &lt;hs-balkendiagramm&gt; zur Visualisierung
 * von Bewertungen durch ein Balkendiagramm.
 * https://blog.angular-university.io/angular-viewchild
 */
@Component({
    selector: 'hs-balkendiagramm',
    templateUrl: './balkendiagramm.html',
})
export class BalkendiagrammComponent implements OnInit {
    dataItems!: DataItem[];

    constructor(
        private readonly service: FilmReadService,
        private readonly titleService: Title,
    ) {
        log.debug('BalkendiagrammComponent.constructor()');
    }

    /**
     * Daten fuer das Balkendiagramm bereitstellen.
     */
    ngOnInit() {
        log.debug('BalkendiagrammComponent.ngOnInit()');
        this.#setDataItems();
        this.titleService.setTitle('Balkendiagramm');
    }

    #setDataItems() {
        this.service
            .find()
            .pipe(
                first(),
                map(result => {
                    if (result instanceof FindError) {
                        throw new KeineFilmeError();
                    }

                    return result
                        .filter(film => film.rating !== undefined)
                        .map(film => this.#toDataItem(film));
                }),
                tap(dataItems => {
                    this.dataItems = dataItems;
                }),
            )
            .subscribe();
    }

    // https://swimlane.gitbook.io/ngx-charts/examples/bar-charts/vertical-bar-chart
    // https://blog.knoldus.com/visualizing-data-with-ngx-charts-in-angular
    #toDataItem(film: Film): DataItem {
        return {
            name: film.id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
            value: film.rating!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
        };
    }
}
