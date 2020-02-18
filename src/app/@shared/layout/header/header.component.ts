import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import {
  AuthService,
  SidebarService,
  MenuService
} from '../../../@core/services';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  tokenPayload: any = {};
  user: any = {};
  userMenu = [ { title: 'Profile' }, { title: 'Logout' } ];

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.onUserMenuClick();
    this.getCurrentUser();
  }

  onUserMenuClick() {
    this.menuService.onMenuItemClick('user-context-menu').subscribe(title => {
      title === 'Logout' ? this.logout() : console.log(title);
    });
  }

  getCurrentUser() {
    this.tokenPayload = this.authService.getTokenPayload();
    this.user = this.tokenPayload.user;
    this.user.name = this.user.firstname + ' ' + this.user.lastname;
  }

  logout(): void {
    this.authService.logout();
  }

  toggleSidebar(): boolean {
    return this.sidebarService.toggleSidebar(true, 'menu-sidebar');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
