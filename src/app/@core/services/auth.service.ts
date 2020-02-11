import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Injectable()
export class AuthService {

  constructor(private authService: NbAuthService) {}

  getTokenPayload(): any {
    let payload: string;
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      payload = token.getPayload();
    });
    return payload;
  }

  logout(strategy: string): void {
    this.authService.logout(strategy);
  }
}
