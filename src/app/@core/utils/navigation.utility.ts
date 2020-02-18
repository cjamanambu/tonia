import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationUtility {

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigateByUrl('/auth');
  }
}
