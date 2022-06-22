import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/model/response.model';
import { Login } from 'src/app/model/login.model';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl: String = environment.apiUrl + 'auth/';
    private refreshPercentTime: number = 0.7; // 0 ~ 1;
    constructor(
        private http: HttpClient,
        private helper: JwtHelperService
    ) { }
    
    /**
     * 登入， post /api/auth/login。
     * @param email 使用者的email
     * @param password 使用者的密碼
     * @returns 
     */
    login(email: string, password: string): Observable<Response<Login>> {
        let data = {
            email: email,
            password: password
        };
        return this.http.post<Response<Login>>(this.authUrl + 'login', data);
    }

    /**
     * 帶入 Login 的 model 將值記錄到 localStorage 中。
     * @param loginItem Login model
     */
    setLoginItem(loginItem: Login): void {
        localStorage.setItem('access_token', loginItem.access_token);
        localStorage.setItem('refresh_token', loginItem.refresh_token);
        localStorage.setItem('expires_in', loginItem.expires_in.toString());
    }

    /**
     * 註冊，post /api/auth/register。
     * @param email 使用者的email
     * @param password 使用者的密碼
     * @param phone 使用者的電話
     * @param name 使用者的姓名
     * @param confirm 密碼確認
     * @returns 
     */
    register(email: string, password: string, phone: string, name: string, confirm: string): Observable<Response<null>> {
        let data = {
            email: email,
            password: password,
            phone: phone,
            name: name,
            confirm: confirm
        }
        return this.http.post<Response<null>>(this.authUrl + 'register', data);
    }

    /**
     * 登出，刪除 localStorage 中 token 的資訊。
     */
    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
    }

    /**
     * 將 access_token 中的 payload 轉成 object。
     * @returns
     */
    get decodedJwtData() {
        return this.helper.decodeToken(localStorage.getItem('access_token')?.toString());
    }

    /**
     * 自動刷新 access_token 。
     */
    autoRefreshToken(): void {
        this.refreshToken(); // 先刷新一次 access_token
        let accessTokenTime = this.helper.decodeToken(localStorage.getItem('access_token')?.toString())['exp'] * 1000; //乘1000變成毫秒。
        let refreshTime = (accessTokenTime - new Date().getTime()) * this.refreshPercentTime;
        setInterval(() => { this.refreshToken() }, refreshTime);
    }

    /**
     * 刷新 access_token，post /api/token/refresh。
     */
    refreshToken() {
        let data = {
            refresh_token: localStorage.getItem('refresh_token'),
            access_token: localStorage.getItem('access_token')
        }
        this.http.patch<Response<Login>>(environment.apiUrl + 'token/refresh', data).subscribe({
            next: res => {
                if (res.statusCode === 200) {
                    this.setLoginItem(res.data);
                }
            }
        });
    }

    /**
     * 自動刷新 Token 的時間百分比，數值為 1 - 100，預設為70。
     */
    setRefreshPercentTime(percentTime: number): void {
        if (percentTime >= 0 && percentTime <= 100) {
            this.refreshPercentTime = percentTime / 100;
        }
    }
}
