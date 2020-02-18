import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbAuthJWTToken, NbPasswordAuthStrategy, NbTokenLocalStorage, NbTokenStorage } from '@nebular/auth';
import { environment } from '../../environments/environment';

import { AuthService, SidebarService, MenuService } from './services';
import { LayoutUtility, NavigationUtility } from './utils';
import { AuthGuard } from './guards';

import { throwIfAlreadyLoaded } from './module-import-guard';

const API_URL = environment.apiUrl;

export const CORE_PROVIDERS = [
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: API_URL,
        login: {
          endpoint: '/auth/login',
          redirect: {
            success: '/pages/dashboard',
            failure: null
          }
        },
        token: {
          class: NbAuthJWTToken,
          key: 'token'
        }
      }),
    ],
    forms: {},
  }).providers,
  {
    provide: NbTokenStorage, useClass: NbTokenLocalStorage
  },
  LayoutUtility,
  NavigationUtility,
  AuthService,
  SidebarService,
  MenuService,
  AuthGuard
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ...CORE_PROVIDERS,
      ],
    } as ModuleWithProviders;
  }
}
