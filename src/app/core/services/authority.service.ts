import { Injectable } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from 'src/auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthortyService {

  constructor(private oauthService: OAuthService) { }

  public isUserAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public signout(): void {
    this.oauthService.logOut();
  }

  public startAuthentication(): any {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  public getBearer(): string {
    if (this.isUserAuthenticated()) {
      return `Bearer ${this.oauthService.getAccessToken()}`;
    }

    return null;
  }

}
