import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountBookComponent } from './account-book/account-book.component';
import { MoneyComponent } from './money/money.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: 'accountBook', component: AccountBookComponent },
      { path: 'money', component: MoneyComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
