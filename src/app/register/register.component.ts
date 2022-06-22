import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    email: string = '';
    phone: string = '';
    name: string = '';
    password: string = '';
    confirm: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    /**
     * 註冊，訂閱 authService 的 register function 所傳回的 Observable 。
     */
    register() {
        
        this.authService.register(this.email, this.password, this.phone, this.name, this.confirm).subscribe({
            next: res => {
                if (res.statusCode === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 1000
                    }).then((result) => {
                        this.router.navigate(['login'])
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
