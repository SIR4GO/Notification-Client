import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RootActivationService implements CanActivate{

  constructor(private route: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(state.url === '/' || state.url === '/bi' || state.url === '/develop' )
    {
      if(localStorage.getItem("userAuth"))
            return true;
    }


    this.route.navigate(['/login']);
    return false;
  }
}
