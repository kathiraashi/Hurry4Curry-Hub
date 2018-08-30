import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from './../services/Admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private _router: Router, private _service: AdminService) {

  }

  canActivate(): boolean {
    if (this._service.If_LoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/Login']);
      return false;
    }
  }

}
