import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    constructor(
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.authService.setRefreshPercentTime(70); // 設定自動刷新 access_token 的百分比時間
        this.authService.autoRefreshToken();// 啟動自動刷新 access_token
    }
}
