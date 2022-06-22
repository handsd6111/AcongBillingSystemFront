import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    get userName(): string {
        return this.authService.decodedJwtData['userName'];
    }

    /**
     * 登出，會彈出視窗。
     */
    logout(): void {
        this.authService.logout();
        Swal.fire({
            icon: 'success',
            title: 'Logout Successfully',
            showConfirmButton: false,
            timer: 1000 //1000ms
        }).then((result) => {
            this.router.navigate(['login']);
        });
    }

    /**
     * 取得目前的URI。
     */
    get currentUrl(): string {
        return this.router.url;
    }
}
