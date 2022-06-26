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
    release: Date;
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
        rating,
        genre,
        studio,
        release,
        newsletter,
        spannend,
        gruselig,
        isan,
    } = filmForm;

    const ratingNumber = Number(rating);

    const releaseTemporal = new Temporal.PlainDate(
        release.getFullYear(),
        release.getMonth() + 1,
        release.getDate(),
    );
    log.debug('toFilm: releaseTemporal=', releaseTemporal);

    const schlagwoerter: string[] = [];
    if (spannend) {
        schlagwoerter.push('SPANNEND');
    }
    if (gruselig) {
        schlagwoerter.push('GRUSELIG');
    }

    const film: Film = {
        titel: titel ?? 'unbekannt',
        rating: ratingNumber,
        genre,
        studio,
        release: releaseTemporal,
        newsletter,
        schlagwoerter,
        isan,
        version: 0,
    };
    log.debug('toFilm: film=', film);
    return film;
};
