import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private helper: JwtHelperService
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


        // 如果沒 access_token 就擋下來
        if (this.helper.tokenGetter() === null) {
            Swal.fire({
                icon: 'error',
                title: "Please sign in.",
                showConfirmButton: false,
                timer: 1000
            }).then((result) => {
                this.router.navigate(['login']);
            });
            return false;
        }

        // 如果 access_token 過期就擋下來
        if (this.helper.isTokenExpired()) {
            Swal.fire({
                icon: 'error',
                title: "Your token has expired.",
                showConfirmButton: false,
                timer: 1000
            }).then((result) => {
                this.router.navigate(['login']);
            });
            return false;
        }

        // 如果權限不足就擋下來，小於 1 的話代表 被禁用的用戶
        if (this.helper.decodeToken()['authority'] < 1) {
            Swal.fire({
                icon: 'error',
                title: "You don't have permission to access.",
                showConfirmButton: false,
                timer: 1000
            }).then((result) => {
                this.router.navigate(['login']);

            });
            return false;
        }

        // 上方都沒被擋下來就放行
        return true;
    }
}
