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
    betrag: number;
    waehrung: string;
    nachname: string;
    vorname: string;
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
        newsletter,
        release,
        betrag,
        waehrung,
        homepage,
        studio,
        genre,
        salma,
        leonardo,
        nachname,
        vorname,
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
        schauspieler.push('S');
    }
    if (leonardo) {
        schauspieler.push('L');
    }

    const film: Film = {
        titel: titel ?? 'unbekannt',
        isan,
        bewertung: bewertungNumber,
        newsletter,
        release: releaseTemporal,
        umsatz: { betrag, waehrung },
        homepage,
        studio,
        genre,
        schauspieler,
        regisseur: { nachname, vorname },
        version: 0,
    };
    log.debug('toFilm: film=', film);
    return film;
};
