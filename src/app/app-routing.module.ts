import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { RessourcesComponent } from './ressources/ressources.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'ressources', component: RessourcesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }