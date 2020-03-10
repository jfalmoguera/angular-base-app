import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ToasterMessageService {

    constructor(private toastr: ToastrService) { }

    showErrorMessage(message: string, title?: string) {
        this.toastr.error(message, title, {
            enableHtml: true
        });
    }

    showSuccessMessage(message: string, title?: string) {
        this.toastr.success(message, title, {
            timeOut: 3000,
            enableHtml: true
        });
    }

    showInfoMessage(message: string, title?: string, timeOut?: number) {

        if (timeOut) {
            this.toastr.info(message, title, {
                timeOut,
                enableHtml: true
            });
        } else {
            this.toastr.info(message, title, {
                timeOut: 1000,
                enableHtml: true
            });
        }
    }

    showWarningMessage(message: string, title?: string) {
        this.toastr.warning(message, title);
    }

    closeAllMessages() {
        this.toastr.clear();
    }
}
