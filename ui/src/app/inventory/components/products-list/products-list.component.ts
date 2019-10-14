// Angular imports
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

// Custom imports
import { AppWebUrls, Endpoints, HttpRequestHandlerService, NotificationHandlerService } from './../../../core';
import { Product } from '../../models/product';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    public appWebUrls = AppWebUrls;
    private productsList: Product[] = [];
    public displayedColumns: string[] = ['name', 'category', 'quantity', 'price', 'description', 'actionsColumn'];
    public productsDataSource: MatTableDataSource<Product>;
    constructor(
        private httpReqHandlerService: HttpRequestHandlerService,
        private notificationHandler: NotificationHandlerService
    ) { }

    ngOnInit() {
        this.getProducts();
    }

    private getProducts() {
        this.httpReqHandlerService.get<Product[]>(Endpoints.products).pipe().subscribe((response: HttpResponse<Product[]>) => {
            if (response.ok) {
                this.productsList = response.body;
                this.productsDataSource = new MatTableDataSource(this.productsList);
            }
        });
    }

    public applyFilter(filterValue: string) {
        this.productsDataSource.filter = filterValue.trim().toLowerCase();
    }

    public deleteRow(id: number) {
        this.httpReqHandlerService.delete(`${Endpoints.product}${id}`).subscribe((response: HttpResponse<string>) => {
            if (response.ok) {
                this.getProducts();
                this.notificationHandler.showNotification(`product deleted successfully`);
            }
        });
    }
}