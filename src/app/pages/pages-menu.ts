import { NbMenuItem } from '@nebular/theme';


export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true
  },
  {
    title: 'MANAGE STORE',
    group: true
  },
  {
    title: 'Staff Management',
    icon: 'people-outline',
    children: [
      {
        title: 'Add Staff',
        link: '/pages/staff/add-staff'
      }
    ]
  }
];
