export class ScanData {
    info: string;
    tipo: string;

    constructor( texto: string ) {
        this.tipo = 'no definido!';
        this.info = texto;

        if ( texto.startsWith('http') ) {
            this.tipo = 'http';
        } else if ( texto.startsWith('maps.google.com/local?q=') ) {
            this.tipo = 'mapa';
        } else if ( texto.startsWith('BEGIN:VCARD') ) {
            this.tipo = 'contacto';
        }
    }
}