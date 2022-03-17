import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ComparisonpageComponent } from './components/comparisonpage/comparisonpage.component';

const routes: Routes = [
  {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'comparison',
        component: ComparisonpageComponent
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
