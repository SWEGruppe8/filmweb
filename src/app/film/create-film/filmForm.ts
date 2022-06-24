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
    bewertung: string;
    release: Date;
    leonardo: boolean;
    salma: boolean;
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
        release,
        umsatz,
        regisseur,
        newsletter,
        leonardo,
        salma,
        isan,
    } = filmForm;

    const bewertungNumber = Number(bewertung);

    const releaseTemporal = new Temporal.PlainDate(
        release.getFullYear(),
        release.getMonth() + 1,
        release.getDate(),
    );
    log.debug('toFilm: releaseTemporal=', releaseTemporal);

    const regisseurNumber = regisseur === undefined ? 0 : regisseur / 100; // eslint-disable-line @typescript-eslint/no-magic-numbers

    const schauspieler: string[] = [];
    if (leonardo) {
        schauspieler.push('LEONARDO');
    }
    if (salma) {
        schauspieler.push('SALMA');
    }

    const film: Film = {
        titel: titel ?? 'unbekannt',
        bewertung: bewertungNumber,
        genre,
        studio,
        release: releaseTemporal,
        umsatz,
        regisseur: regisseurNumber,
        newsletter,
        schauspieler,
        isan,
        version: 0,
    };
    log.debug('toFilm: film=', film);
    return film;
};
