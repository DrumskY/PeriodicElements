import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerioddicElementComponent } from './pages/periodic-element-page/periodic-element.component';

const routes: Routes = [
  {
    path: '',
    component: PerioddicElementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
