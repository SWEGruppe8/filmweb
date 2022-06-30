// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable max-lines-per-function */
import { type Film, type FilmShared } from './film';
import type { FilmGenre, Regisseur, Studio, Umsatz } from './film';
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
    titel: string;
    isan: string;
    bewertung?: number;
    newsletter?: boolean;
    release?: string;
    umsatz: Umsatz;
    homepage: string;
    studio?: Studio | '';
    genre: FilmGenre;
    schauspieler?: string[];
    regisseur: Regisseur;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _links?: {
        self: Link;
        list?: Link;
        add?: Link;
        update?: Link;
        remove?: Link;
    };
}

export interface CreateFilmServer {
    film: {
        titel: string;
        isan: string;
        bewertung?: number;
        newsletter?: boolean;
        release?: string;
        umsatz: Umsatz;
        homepage: string;
        studio?: Studio | '';
        genre: FilmGenre;
        schauspieler?: string[];
        regisseur: Regisseur;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        _links?: {
            self: Link;
            list?: Link;
            add?: Link;
            update?: Link;
            remove?: Link;
        };
    };
    user: {
        username: string;
        password: string;
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
        isan,
        bewertung,
        newsletter,
        release,
        umsatz,
        homepage,
        studio,
        genre,
        schauspieler,
        regisseur,
    } = filmServer;

    let releaseTemporal: Temporal.PlainDate | undefined;
    if (release !== undefined) {
        const [yearStr, monthStr, dayStr] = release
            .replace(/T.*/gu, '')
            .split('-');
        const year = Number(yearStr);
        const month = Number(monthStr);
        const day = Number(dayStr);
        releaseTemporal = new Temporal.PlainDate(year, month, day);
    }

    const film: Film = {
        id,
        titel,
        isan,
        bewertung,
        newsletter,
        release: releaseTemporal,
        umsatz,
        homepage,
        studio,
        genre,
        schauspieler: schauspieler ?? [],
        regisseur,
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
export const toFilmServer = (film: Film): CreateFilmServer => {
    const release =
        film.release === undefined ? undefined : film.release.toString();
    return {
        film: {
            titel: film.titel,
            isan: film.isan,
            bewertung: film.bewertung,
            newsletter: film.newsletter,
            release,
            umsatz: film.umsatz,
            homepage: film.homepage,
            studio: film.studio,
            genre: film.genre,
            schauspieler: film.schauspieler,
            regisseur: film.regisseur,
        },
        user: {
            username: film.titel,
            password: `${film.titel}`,
        },
    };
};
