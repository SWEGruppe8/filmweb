import { Component, Input } from '@angular/core';
import { type Film } from '../../shared';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-suchergebnis</code>, um das Ergebnis der
 * Suche anzuzeigen, d.h. die gefundenen Filme oder eine Fehlermeldung.
 */
@Component({
    selector: 'hs-suchergebnis',
    templateUrl: './suchergebnis.component.html',
})
export class SuchergebnisComponent {
    // Im ganzen Beispiel: lokale Speicherung des Zustands und nicht durch z.B.
    // eine Flux-Bibliothek wie beispielsweise Redux http://redux.js.org

    // Property Binding: <hs-suchergebnis [filme]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    filme: Film[] = [];

    @Input()
    errorMsg: string | undefined;

    constructor() {
        log.debug('SuchergebnisComponent.constructor()');
    }
}
