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
    bewertung: number;
    release: Date;
    salma: boolean;
    leonardo: boolean;
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
        bewertung,
        genre,
        studio,
        newsletter,
        release,
        homepage,
        salma,
        leonardo,
        regisseur,
        umsatz,
        isan,
    } = filmForm;

    const bewertungNumber = Number(bewertung);

    const releaseTemporal = new Temporal.PlainDate(
        release.getFullYear(),
        release.getMonth() + 1,
        release.getDate(),
    );
    log.debug('toFilm: releaseTemporal=', releaseTemporal);

    const schauspieler: string[] = [];
    if (salma) {
        schauspieler.push('SALMA');
    }
    if (leonardo) {
        schauspieler.push('LEONARDO');
    }

    const film: Film = {
        titel: titel ?? 'unbekannt',
        bewertung: bewertungNumber,
        genre,
        studio,
        newsletter,
        release: releaseTemporal,
        homepage,
        schauspieler,
        version: 0,
        regisseur,
        umsatz,
        isan,
    };
    log.debug('toFilm: film=', film);
    return film;
};
