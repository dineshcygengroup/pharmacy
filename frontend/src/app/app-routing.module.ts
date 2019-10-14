import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: "pharmacy",
        loadChildren: './pharmacy/pharmacy.module#PharmacyModule'    
    },
    {
        path: 'hms',
        redirectTo: '/pharmacy/addsupplier',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
