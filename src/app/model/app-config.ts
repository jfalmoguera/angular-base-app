import { AuthConfig } from 'angular-oauth2-oidc';

export interface AppConfig {
    UrlApi: string;
    azureADSettings: AuthConfig;
    appInsightsConfig: {
        instrumentationKey: string;
        logPageView: boolean;
    };
}