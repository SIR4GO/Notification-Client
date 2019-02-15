import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RootActivationService implements CanActivate{

  constructor(private route: Router , private userService:UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {


      let cardinality = localStorage.getItem("userAuth");

      return this.userService.existSender(cardinality).pipe(
        map (data => {
          if(state.url = '/develop')
          {
               if(data.message === 'exist')
                   return true;
               else if ( data.message === 'not exist'){

                   this.route.navigate(['/login']);
                   return false;
               }

          }
        })

      );

  }

}
