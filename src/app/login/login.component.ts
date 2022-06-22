import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email: string = '';
    password: string = '';
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    /**
     * 登入，訂閱 authService 的 login function 所傳回的 Observable 。
     */
    login(): void {
        
        this.authService.login(this.email, this.password).subscribe({
            next: res => {
                if (res.statusCode === 200) {
                    this.authService.setLoginItem(res.data);
                    Swal.fire({
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 1000 //1000ms
                    }).then((result) => {
                        this.router.navigate([''])
                    });
                }
            },
            error: err => {
                let errorMessage: string = '<hr/>';
                Object.entries(err.error.data).forEach(obj => {
                    errorMessage += `<div> ${obj[1]} </div> <hr/>`;
                });
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: err.error.message,
                    showCancelButton: true,
                    confirmButtonText: 'More Details',
                    cancelButtonText: 'Ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            icon: 'info',
                            title: 'Error Info',
                            html: errorMessage,
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonText: 'Ok',
                        })
                    }
                })
            }
        });

    }
}