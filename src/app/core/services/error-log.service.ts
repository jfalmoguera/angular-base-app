import { Injectable } from '@angular/core';

/**
 * Servicio para gestionar el log de errores de la app
 */
@Injectable({
    providedIn: 'root'
})
export class ErrorLogService {
    constructor() { }

    public logError(error: any): void {
        this.sendToConsole(error);
        this.sendToServer(error);
    }


    private sendToConsole(error: any): void {
        if (console && console.group && console.error) {
            console.group('Error Log Service');
            console.error(error);
            console.groupEnd();
        }
    }

    private sendToServer(error: any): void {
    }
}
