import { type Temporal } from '@js-temporal/polyfill';

export const MAX_BEWERTUNG = 5;

export type Studio = 'D' | 'W';

export type FilmGenre = 'A' | 'L';
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
export interface Umsatz {
    betrag: number;
    waehrung: string;
}

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export interface Film {
    id?: string;
    version?: number;
    titel: string;
    isan: string;
    bewertung: number | undefined;
    newsletter: boolean | undefined;
    release: Temporal.PlainDate | undefined;
    umsatz: Umsatz;
    homepage: string;
    studio: Studio | '' | undefined;
    genre: FilmGenre;
    schauspieler: string[];
    regisseur: Regisseur;
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
    isan: string;
    newsletter?: boolean;
    umsatz: Umsatz;
    homepage: string;
    studio?: Studio | '';
    genre: FilmGenre;
    regisseur: Regisseur;
}
