import { type Film, FilmReadService, FindError } from '../shared'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, type OnInit } from '@angular/core';
import { type DataItem, type MultiSeries } from '@swimlane/ngx-charts';
import { first, map, tap } from 'rxjs/operators';
import { KeineFilmeError } from './errors';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-liniendiagramm&gt; zur Visualisierung
 * von Bewertungen durch ein Liniendiagramm.
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

                    return result.filter(film => film.rating !== undefined);
                }),
                tap(filmItems => {
                    const bewertungItems = this.#getBewertungItems(filmItems);
                    const umsatzItems = this.#getUmsatzItems(filmItems);
                    this.#initSeries(bewertungItems, umsatzItems);
                }),
            )
            .subscribe();
    }

    // https://swimlane.gitbook.io/ngx-charts/examples/line-area-charts/line-chart
    #getBewertungItems(filme: Film[]): DataItem[] {
        // eslint-disable-next-line arrow-body-style
        return filme.map(film => {
            return {
                name: film.id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                value: film.rating!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
            };
        });
    }

    #getUmsatzItems(filme: Film[]): DataItem[] {
        // eslint-disable-next-line arrow-body-style
        return filme.map(film => {
            return {
                name: film.id!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                value: film.umsatz,
            };
        });
    }

    #initSeries(bewertungItems: DataItem[], umsatzItems: DataItem[]) {
        const series: MultiSeries = [
            {
                name: 'Bewertungen',
                series: bewertungItems,
            },
            {
                name: 'Umsatz',
                series: umsatzItems,
            },
        ];

        this.series = series;
    }
}
