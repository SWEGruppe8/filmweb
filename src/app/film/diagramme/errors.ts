export class KeineFilmeError extends Error {
    constructor() {
        super('Es gibt keine Filme');
        this.name = 'KeineFilmeError';
    }
}
