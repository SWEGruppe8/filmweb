import { type Temporal } from '@js-temporal/polyfill';

export const MAX_RATING = 5;

export type Studio = 'WARNER' | 'DISNEY';

export type FilmGenre = 'LUSTIG' | 'ACTION';

export const ISBN_REGEX =
    // eslint-disable-next-line max-len
    /\d{3}-\d-\d{5}-\d{3}-\d|\d-\d{5}-\d{3}-\d|\d-\d{4}-\d{4}-\d|\d{3}-\d{10}|\d{13}/u;

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export interface Buch {
    id?: string;
    version?: number;
    titel: string;
    bewertung: number | undefined;
    genre: FilmGenre;
    studio: Studio | '' | undefined;
    release: Temporal.PlainDate | undefined;
    umsatz: number;
    regisseur: string;
    newsletter: boolean | undefined;
    schlagwoerter: string[];
    isan: string;
}

/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Buchdaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 * Verwendung in den Interfaces:
 * - BuchServer für BuchReadService
 * - BuchForm für CreateBuchComponent
 */
export interface BuchShared {
    titel: string | undefined;
    studio?: Studio | '';
    genre: FilmGenre;
    umsatz: number;
    regiseeur: string;
    newsletter?: boolean;
    isa: string;
}
