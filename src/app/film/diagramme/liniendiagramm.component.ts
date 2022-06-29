import { Component, type OnInit } from '@angular/core';
import { type DataItem, type MultiSeries } from '@swimlane/ngx-charts';
import { type Film, FilmReadService, FindError } from '../shared'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { first, map, tap } from 'rxjs/operators';
import { KeineFilmeError } from './errors';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-liniendiagramm&gt; zur Visualisierung
 * von Rating durch ein Liniendiagramm.
 */
@Component({
    selector: 'hs-liniendiagramm',
    templateUrl: './liniendiagramm.html',
})
export class LiniendiagrammComponent implements OnInit {
    series!: MultiSeries;

    constructor(
        private readonly service: FilmReadService,
        private readonly titleService: Title,
    ) {
        log.debug('LiniendiagrammComponent.constructor()');
    }

    /**
     * Daten fuer das Liniendiagramm bereitstellen.
     */
    ngOnInit() {
        log.debug('LiniendiagrammComponent.ngOnInit()');
        this.#setSeries();
        this.titleService.setTitle('Liniendiagramm');
    }

    #setSeries() {
        this.service
            .find()
            .pipe(
                first(),
                map(result => {
                    if (result instanceof FindError) {
                        throw new KeineFilmeError();
                    }

                    return result.filter(film => film.bewertung !== undefined);
                }),
                tap(filmItems => {
                    const bewertungItems = this.#getBewertungItems(filmItems);
                    const datumItems = this.#getDatumItems(filmItems);
                    this.#initSeries(bewertungItems, datumItems);
                }),
            )
            .subscribe();
    }

    // https://swimlane.gitbook.io/ngx-charts/examples/line-area-charts/line-chart
    #getRatingItems(filme: Film[]): DataItem[] {
        // eslint-disable-next-line arrow-body-style
        return filme.map(film => {
            return {
                name: film.id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                value: film.bewertung!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
            };
        });
    }

    #getDatumItems(filme: Film[]): DataItem[] {
        // eslint-disable-next-line arrow-body-style
        return filme.map(film => {
            return {
                name: film.id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                value: Date.now(),
            };
        });
    }

    #initSeries(ratingItems: DataItem[], datumItems: DataItem[]) {
        const series: MultiSeries = [
            {
                name: 'Bewertung',
                series: bewertungItems,
            },
            {
                name: 'Datum',
                series: datumItems,
            },
        ];

        this.series = series;
    }
}
