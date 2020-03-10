import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/model';
import { AppConfigService } from './app-config.service';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    // private _perfilUsuario: Usuario;

    // get perfilDeUsuario(): Usuario {
    //     const v = localStorage.getItem('userProfile');
    //     if (v) {
    //         return JSON.parse(v);
    //     }
    //     return null;
    // }

    constructor(private httpClient: HttpClient, private appConfig: AppConfigService) {
    }

    loadUserProfile(): Observable<Usuario> {
        const url = this.appConfig.UrlApi;
        // localStorage.removeItem('userProfile');
        return this.httpClient.get<Usuario>(`${url}perfilDeUsuario`).pipe(map(x => {
            const user = new Usuario();
            // localStorage.setItem('userProfile', JSON.stringify(user));
            return user;
        }));
    }

    hasUserRole(role: any) {
        return true;
    }
}
