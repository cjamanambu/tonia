import { Injectable } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class MenuService {

  constructor(private menuService: NbMenuService) {}

  onMenuItemClick(menuTag: string): Observable<string> {
    return this.menuService.onItemClick().pipe(
      filter(({ tag }) => tag === menuTag),
      map(({ item: { title } }) => title),
    );
  }
}
