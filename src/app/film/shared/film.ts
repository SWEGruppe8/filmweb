import { type Temporal } from '@js-temporal/polyfill';

export const MAX_RATING = 5;

export type Studio = 'DISNEY' | 'WARNER';

export type FilmGenre = 'ACTION' | 'COMEDY';
export const ISAN_REGEX =
    // eslint-disable-next-line max-len
    /\d{3}-\d-\d{5}-\d{3}-\d|\d-\d{5}-\d{3}-\d|\d-\d{4}-\d{4}-\d|\d{3}-\d{10}|\d{13}/u;

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export interface Film {
    id?: string;
    version?: number;
    titel: string;
    rating: number | undefined;
    genre: FilmGenre;
    studio: Studio | '' | undefined;
    release: Temporal.PlainDate | undefined;
    newsletter: boolean | undefined;
    schlagwoerter: string[];
    isan: string;
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
    isan: string;
}
