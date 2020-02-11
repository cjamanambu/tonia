import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AuthService, NavigationService, SidebarService } from '../../../@core/services';
import { LayoutUtility } from '../../../@core/utils';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  user: any = {};
  userMenu = [ { title: 'Profile' }, { title: 'Logout' } ];

  constructor(
    private sidebarService: SidebarService,
    private menuService: NbMenuService,
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.onUserMenuClick();
    this.user = (this.authService.getTokenPayload()).user;
  }

  onUserMenuClick() {
    this.menuService.onItemClick().pipe(
      filter(({ tag }) => tag === 'user-context-menu'),
      map(({ item: { title } }) => title),
    ).subscribe(title => {
      if (title === 'Logout') {
        this.logout();
      }
    });
  }

  logout(): void {
    this.authService.logout('email');
    this.navigationService.navigateToLogin();
  }

  toggleSidebar(): boolean {
    return this.sidebarService.toggleSidebar(true, 'menu-sidebar');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
