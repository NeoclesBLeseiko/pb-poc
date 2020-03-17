import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Test1Component } from './routes/test1/test1.component';
import { Test2Component } from './routes/test2/test2.component';

const appRoutes: Routes = [
  { path: 'test1', component: Test1Component },
  { path: 'test2', component: Test2Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class AppRouterModule {}