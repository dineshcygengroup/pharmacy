import { ParamMap, Router } from '@angular/router';
// Angular imports
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, EMPTY } from "rxjs";

// Custom imports
import { Endpoints, FormBuilderService, HttpRequestHandlerService, NotificationHandlerService, AppWebUrls } from "../../../core";
import { Product } from "../../models/product";
import { ProductCategories } from "../../models/product-category";

@Component({
    selector: "app-add-product",
    templateUrl: "./add-product.component.html",
    styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {
    private product: Product = <Product>{};
    private isEditMode: boolean = false;
    public addProductForm: FormGroup;
    public productCategories$: Observable<ProductCategories[]> = EMPTY;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilderService,
        private httpReqHandlerService: HttpRequestHandlerService,
        private notificationHandler: NotificationHandlerService
    ) {
        this.addProductForm = this.formBuilder.createForm<Product>({
            category: "",
            description: "",
            name: "",
            price: 0,
            quantity: 0
        });
    }

    ngOnInit() {
        this.readPageQueryParams();
        this.getProductCategories();
    }

    private getProductCategories() {
        this.productCategories$ = this.httpReqHandlerService
            .get<ProductCategories[]>(Endpoints.productCategories)
            .pipe(
                map((response: HttpResponse<ProductCategories[]>) => {
                    return response.body;
                })
            );
    }

    private readPageQueryParams() {
        this.activatedRoute.queryParams.subscribe((data: ParamMap) => {
            if ('id' in data) {
                this.isEditMode = true;
                const productID: number = <number>data['id'];
                this.getProductByID(productID);
            }
            else {
                this.isEditMode = false;
            }
        });
    }

    private getProductByID(id: number) {
        this.httpReqHandlerService.getItem<Product>(Endpoints.product, id).subscribe((response: HttpResponse<Product>) => {
            if (response.ok) {
                this.product = response.body;
                this.formBuilder.setFormValue(this.addProductForm, this.product);
            }
            else {
                this.notificationHandler.showNotification(`error occured while fetching product with id ${id}`);
            }
        });
    }

    private addProduct() {
        const productData: Product = this.formBuilder.getFormValue<Product>(
            this.addProductForm
        );
        this.httpReqHandlerService
            .post<Product, Product>(Endpoints.products, productData)
            .subscribe((response: HttpResponse<Product>) => {
                if (response.ok) {
                    this.notificationHandler.showNotification('Product added successfully');
                    this.router.navigate([AppWebUrls.productList]);
                }
                else {
                    this.notificationHandler.showNotification('Some error occurred while adding the product');
                }
            });
    }

    private updateProduct(id: number, product: Product) {
        this.httpReqHandlerService.put(`${Endpoints.product}${id}/`, product).subscribe((response: HttpResponse<string>) => {
            if (response.ok) {
                this.notificationHandler.showNotification(`product updated successfully`);
                this.router.navigate([AppWebUrls.productList]);
            }
            else {
                this.notificationHandler.showNotification(`Some error occured while updating the product`);
            }
        });
    }

    public save() {
        const productData: Product = this.formBuilder.getFormValue<Product>(
            this.addProductForm
        );
        if (this.isEditMode) {
            this.updateProduct(<number>this.product.id, productData);
        }
        else {
            this.addProduct();
        }
    }
}
