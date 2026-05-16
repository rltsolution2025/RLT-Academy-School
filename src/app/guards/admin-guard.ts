import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);

  //Check Session
  const adminUser = sessionStorage.getItem('adminUser');

  // If Login Exists

  if (adminUser) {
    return true;
  }

  //REDIRECT LOGIN
  router.navigate(['/admin/login']);
  return false;
};
