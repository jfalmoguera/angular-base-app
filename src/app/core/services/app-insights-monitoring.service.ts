import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveEnd, Router } from '@angular/router';
import { AppInsights } from 'applicationinsights-js';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';

@Injectable({
    providedIn: 'root'
})
export class AppInsightsMonitoringService {
    routerSubscription: Subscription;

    constructor(private router: Router, private appConfig: AppConfigService) {
        if (appConfig.appInsightsConfig && appConfig.appInsightsConfig.instrumentationKey) {
            AppInsights.downloadAndSetup(appConfig.appInsightsConfig);
        }

        if (appConfig.appInsightsConfig && appConfig.appInsightsConfig.logPageView) {
            this.routerSubscription = this.router.events.pipe(
                filter(event => event instanceof ResolveEnd))
                .subscribe((event: ResolveEnd) => {
                    const activatedComponent = this.getActivatedComponent(event.state.root);
                    if (activatedComponent) {
                        this.logPageView(`${activatedComponent.name} ${this.getRouteTemplate(event.state.root)}`, event.urlAfterRedirects);
                    }
                });
        }
    }

    setAuthenticatedUserId(userId: string): void {
        AppInsights.setAuthenticatedUserContext(userId);
    }

    logPageView(name: string, url?: string, properties?: { [key: string]: string },
                measurements?: { [key: string]: number }, duration?: number) {
        AppInsights.trackPageView(name, url, this.AddGlobalProperties(properties), measurements, duration);
    }

    logEvent(name: string, properties?: { [key: string]: string }, measurements?: { [key: string]: number }) {
        AppInsights.trackEvent(name, this.AddGlobalProperties(properties), measurements);
    }

    logError(error: Error, properties?: { [key: string]: string }, measurements?: { [key: string]: number }) {
        AppInsights.trackException(error, null, this.AddGlobalProperties(properties), measurements);
    }

    private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
        if (snapshot.firstChild) {
            return this.getActivatedComponent(snapshot.firstChild);
        }

        return snapshot.component;
    }

    private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
        let path = '';
        if (snapshot.routeConfig) {
            path += snapshot.routeConfig.path;
        }

        if (snapshot.firstChild) {
            return path + this.getRouteTemplate(snapshot.firstChild);
        }

        return path;
    }

    private AddGlobalProperties(properties?: { [key: string]: string }): { [key: string]: string } {
        const basePro = {
            appVersion: '0.1'
        };

        return Object.assign({}, properties, basePro);
    }
}
