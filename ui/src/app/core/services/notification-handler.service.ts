import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationHandlerService {

    constructor(private snackBar: MatSnackBar) { }

    showNotification(message: string, action?: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
        });
    }
}