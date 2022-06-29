import { type Temporal } from '@js-temporal/polyfill';

export const MAX_RATING = 5;

export type Studio = 'DISNEY' | 'WARNER';

export type FilmGenre = 'ACTION' | 'COMEDY';
export const HOMEPAGE_REGEX =
    // eslint-disable-next-line max-len
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/u;

export const ISAN_REGEX =
    // eslint-disable-next-line max-len
    /\d{3}-\d-\d{5}-\d{3}-\d|\d-\d{5}-\d{3}-\d|\d-\d{4}-\d{4}-\d|\d{3}-\d{10}|\d{13}/u;

export interface Regisseur {
    nachname: string;
    vorname: string;
}

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export interface Film {
    id?: string;
    version?: number;
    titel: string;
    bewertung: number | undefined;
    genre: FilmGenre;
    studio: Studio | '' | undefined;
    newsletter: boolean | undefined;
    release: Temporal.PlainDate | undefined;
    umsatz: number;
    regisseur: Regisseur;
    homepage: string;
    isan: string;
    schauspieler: string[];
}

/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Filmdaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 * Verwendung in den Interfaces:
 * - FilmServer für FilmReadService
 * - FilmForm für CreateFilmComponent
 */
export interface FilmShared {
    titel: string | undefined;
    studio?: Studio | '';
    genre: FilmGenre;
    newsletter?: boolean;
    homepage: string;
    umsatz: number;
    regisseur: Regisseur;
    isan: string;
}
