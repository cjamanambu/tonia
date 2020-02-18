import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken, NbTokenStorage } from '@nebular/auth';
import { NavigationUtility } from '../utils';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private authService: NbAuthService, private navigationUtility: NavigationUtility, private tokenStorage: NbTokenStorage) {}

  getTokenPayload(): string {
    let payload: string;
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      payload = token.getPayload();
    });
    return payload;
  }

  logout(): void {
    this.tokenStorage.clear();
    this.navigationUtility.navigateToLogin();
  }

  isAuthenticatedUser(): Observable<boolean> {
    return this.authService.isAuthenticated()
    .pipe(tap(authenticated => {
      if (!authenticated) {
        this.navigationUtility.navigateToLogin();
      }
    }));
  }
}
