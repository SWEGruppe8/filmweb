import { type Film, type FilmShared } from '../shared';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

/**
 * Daten aus einem Formular:
 * <ul>
 *  <li> je 1 Control fuer jede Checkbox und
 *  <li> au&szlig;erdem Strings f&uuml;r Eingabefelder f&uuml;r Zahlen.
 * </ul>
 */
export interface FilmForm extends FilmShared {
    rating: string;
    datum: Date;
    spannend: boolean;
    gruselig: boolean;
}

/**
 * Ein Film-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
 * @param film JSON-Objekt mit Daten vom Formular
 * @return Das initialisierte Film-Objekt
 */
export const toFilm = (filmForm: FilmForm) => {
    log.debug('toFilm: filmForm=', filmForm);

    const {
        titel,
        isan,
        bewertung,
        genre,
        studio,
        release,
        umsatz,
        schauspieler,
        regisseur,
        spannend,
        gruselig,
    } = filmForm;

    const bewertungNumber = Number(bewertung);

    const releaseTemporal = new Temporal.PlainDate(
        release.getFullYear(),
        release.getMonth() + 1,
        release.getDate(),
    );
    log.debug('toFilm: datumTemporal=', datumTemporal);

    // für Umsatz noch machen: const rabattNumber = rabatt === undefined ? 0 : rabatt / 100; // eslint-disable-line @typescript-eslint/no-magic-numbers

    const schlagwoerter: string[] = [];
    if (spannend) {
        schlagwoerter.push('SPANNEND');
    }
    if (gruselig) {
        schlagwoerter.push('GRUSELIG');
    }

    const film: Film = {
        titel: titel ?? 'unbekannt',
        isan,
        bewertung: bewertungNumber,
        genre,
        studio,
        release: releaseTemporal,
        umsatz,
        regisseur,
        schlagwoerter,
        version: 0,
    };
    log.debug('toFilm: film=', film);
    return film;
};
