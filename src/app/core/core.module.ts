import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, ROOT_REDUCERS } from './@redux';
import { COMPONENTS } from './components';
import { AppComponent } from './views/app.component';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ToastrModule } from 'ngx-toastr';
import { AppConfigService } from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptor } from './interceptors/auth.interceptor';
import { LogInterceptor } from './interceptors/error.interceptor';

export const CORE_COMPONENTS = [
  AppComponent,
  COMPONENTS
];

export function initConfig(config: AppConfigService) {
  const promise = config.loadSettings(environment.configFile);
  return () => promise;
}

@NgModule({
  declarations: [CORE_COMPONENTS],
  exports: [AppComponent],
  imports: [
    CommonModule,
    RouterModule,
    OAuthModule.forRoot(),
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      name: 'Bravent Angular App',
      logOnly: environment.production,
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    AppConfigService,
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfigService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
  ]
})
export class CoreModule { }
