import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AccountBookComponent } from './account-book/account-book.component';
import { MoneyComponent } from './money/money.component';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    UserComponent,
    AccountBookComponent,
    MoneyComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
