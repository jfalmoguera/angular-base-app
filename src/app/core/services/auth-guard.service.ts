
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthortyService } from './authority.service';
import { UserProfileService } from './user-profile.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthortyService, private userProfile: UserProfileService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const expectedRole = route.data.expectedRole;

        if (this.authService.isUserAuthenticated()) {
            if (this.canUserGo(expectedRole)) {
                return true;
            }
            return false;
        }

        console.log('User in not authenticated... redirecting AZURE AD');
        this.authService.startAuthentication();
        return false;
    }


    private canUserGo(role: any): boolean {

        if (role === undefined || role === null) {
            return true;
        }

        return this.userProfile.hasUserRole(role);
    }

}

