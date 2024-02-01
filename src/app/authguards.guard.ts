import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private router:Router) { }
  token:any;
  canActivate(
  ): boolean {
    this.token = localStorage.getItem('token');
    if(this.token){
      return true;
    }
    else{
        this.router.navigate(['/login']);
      return false;
    }
  }
  
}




