import { type Film, type FilmShared } from './film';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

interface Link {
    href: string;
}

/**
 * Daten vom und zum REST-Server:
 * <ul>
 *  <li> Arrays f&uuml;r mehrere Werte, die in einem Formular als Checkbox
 *       dargestellt werden.
 *  <li> Daten mit Zahlen als Datentyp, die in einem Formular nur als
 *       String handhabbar sind.
 * </ul>
 */
export interface FilmServer extends FilmShared {
    rating?: number;
    datum?: string;
    schlagwoerter?: string[];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _links?: {
        self: Link;
        list?: Link;
        add?: Link;
        update?: Link;
        remove?: Link;
    };
}

/**
 * Ein Film-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
 * Service kommen.
 * @param film JSON-Objekt mit Daten vom RESTful Web Server
 * @return Das initialisierte Film-Objekt
 */
export const toFilm = (filmServer: FilmServer, etag?: string) => {
    let selfLink: string | undefined;
    const { _links } = filmServer; // eslint-disable-line @typescript-eslint/naming-convention
    if (_links !== undefined) {
        const { self } = _links;
        selfLink = self.href;
    }
    let id: string | undefined;
    if (selfLink !== undefined) {
        const lastSlash = selfLink.lastIndexOf('/');
        id = selfLink.slice(lastSlash + 1);
    }

    let version: number | undefined;
    if (etag !== undefined) {
        // Anfuehrungszeichen am Anfang und am Ende entfernen
        const versionStr = etag.slice(1, -1);
        version = Number.parseInt(versionStr, 10);
    }

    const {
        titel,
        rating,
        genre,
        studio,
        datum,
        online,
        schlagwoerter,
        isan,
    } = filmServer;

    let datumTemporal: Temporal.PlainDate | undefined;
    // TODO Parsing, ob der Datum-String valide ist
    if (datum !== undefined) {
        const [yearStr, monthStr, dayStr] = datum
            .replace(/T.*/gu, '')
            .split('-');
        const year = Number(yearStr);
        const month = Number(monthStr);
        const day = Number(dayStr);
        datumTemporal = new Temporal.PlainDate(year, month, day);
    }

    const film: Film = {
        id,
        titel: titel ?? 'unbekannt',
        rating,
        genre,
        studio,
        datum: datumTemporal,
        online,
        schlagwoerter: schlagwoerter ?? [],
        isan,
        version,
    };
    log.debug('Film.fromServer: film=', film);
    return film;
};

/**
 * Konvertierung des Filmobjektes in ein JSON-Objekt f&uuml;r den RESTful
 * Web Service.
 * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
 */
export const toFilmServer = (film: Film): FilmServer => {
    const datum = film.datum === undefined ? undefined : film.datum.toString();
    return {
        titel: film.titel,
        rating: film.rating,
        genre: film.genre,
        studio: film.studio,
        datum,
        online: film.online,
        schlagwoerter: film.schlagwoerter,
        isan: film.isan,
    };
};
