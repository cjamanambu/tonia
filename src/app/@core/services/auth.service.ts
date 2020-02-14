import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NavigationUtility } from '../utils';

@Injectable()
export class AuthService {

  constructor(private authService: NbAuthService, private navigationUtility: NavigationUtility) {}

  getTokenPayload(): any {
    let payload: string;
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      payload = token.getPayload();
      console.log(token);
    });
    return payload;
  }

  logout(strategy: string): void {
    this.authService.logout(strategy);
    this.navigationUtility.navigateToLogin();
  }
}
