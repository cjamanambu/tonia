import { Injectable } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { LayoutUtility } from '../utils';

@Injectable()
export class SidebarService {

  constructor(private sidebarService: NbSidebarService, private layoutUtility: LayoutUtility) {}

  toggleSidebar(compact: boolean, tag: string): boolean {
    this.sidebarService.toggle(compact, tag);
    this.layoutUtility.changeLayoutSize();
    return false;
  }
}
