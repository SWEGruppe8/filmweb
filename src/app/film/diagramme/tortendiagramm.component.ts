import { Component, type OnInit } from '@angular/core';
import { type Film, FilmReadService, FindError } from '../shared'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { first, map, tap } from 'rxjs/operators';
import { type DataItem } from '@swimlane/ngx-charts';
import { KeineFilmeError } from './errors';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente mit dem Tag &lt;hs-tortendiagramm&gt; zur Visualisierung
 * von Rating  durch ein Tortendiagramm.
 */
@Component({
    selector: 'hs-tortendiagramm',
    templateUrl: './tortendiagramm.html',
})
export class TortendiagrammComponent implements OnInit {
    dataItems!: DataItem[];

    constructor(
        private readonly service: FilmReadService,
        private readonly titleService: Title,
    ) {
        log.debug('TortendiagrammComponent.constructor()');
    }

    /**
     * Daten fuer das Tortendiagramm bereitstellen.
     */
    ngOnInit() {
        log.debug('TortendiagrammComponent.ngOnInit()');
        this.#setDataItems();
        this.titleService.setTitle('Tortendiagramm');
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

    // https://stackblitz.com/edit/swimlane-pie-chart?embed=1&file=app/app.component.ts
    #toDataItem(film: Film): DataItem {
        return {
            name: film.titel!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
            value: film.rating!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
        };
    }
}
