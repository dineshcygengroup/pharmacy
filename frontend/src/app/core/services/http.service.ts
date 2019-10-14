import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Supplier } from 'src/app/pharmacy/models/supplier';
import { Medicine } from 'src/app/pharmacy/models/medicine';
import { PurchaseOrder } from 'src/app/pharmacy/models/purchase-order';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    BASE_URL = '/api/';
    private httpOptions: any;
    constructor(private httpClient: HttpClient,
        private cookieService: CookieService) { }

    getSupplierList() {
        return this.httpClient.get(`${this.BASE_URL}suppliers/`);
    }

    addSupplier(supplier: Supplier) {
        return this.post(`${this.BASE_URL}suppliers/`, supplier);
    }

    deleteSupplier(id: number) {
        return this.delete(`${this.BASE_URL}supplier/${id}`);
    }

    updateSupplier(supplier: Supplier) {
        return this.put(`${this.BASE_URL}supplier/${supplier.id}`, supplier);
    }   

    getMedicineList() {
        return this.httpClient.get(`${this.BASE_URL}medicines/`);
    }

    addMedicine(medicine: Medicine) {
        return this.post(`${this.BASE_URL}medicines/`, medicine);
    }

    deleteMedicine(medicine: Medicine) {
        return this.delete(`${this.BASE_URL}medicine/${medicine.id}`);
    }

    updateMedicine(medicine: Medicine) {
        return this.put(`${this.BASE_URL}medicine/${medicine.id}`, medicine);
    }

    deleteMedicineOrder(orderId: number) {
        return this.delete(`${this.BASE_URL}order/${orderId}`);
    }

    addMedicineOrder(medicineOrder: PurchaseOrder) {
        return this.post(`${this.BASE_URL}orders/`, medicineOrder);
    }

    updateMedicineOrder(medicineOrder: PurchaseOrder) {
        return this.put(`${this.BASE_URL}order/${medicineOrder.id}`, medicineOrder);
    }

    getMedicineOrderList() {
        return this.httpClient.get(`${this.BASE_URL}orders/`);
    }

    getMedicineCategoryList() {
        return this.httpClient.get(`${this.BASE_URL}medicinecategory/`);
    }

    getStoreLocationList() {
        return this.httpClient.get(`${this.BASE_URL}storelocations/`);
    }

    getPaymentOptionList() {
        return this.httpClient.get(`${this.BASE_URL}paymentoption/`);
    }

    getPurchaseTaxList(){
        return this.httpClient.get(`${this.BASE_URL}purchasetax/`);
    }
    getinpatientsList(){
        return this.httpClient.get(`${this.BASE_URL}patientappoints/`);
    }

    private updateHttpOptions() {
        let csrf = this.cookieService.get("csrftoken");
        if(typeof(csrf) === 'undefined') {
            csrf = ''
        }
        this.httpOptions = {
            headers: new HttpHeaders({
                'content-Type': 'application/json',
                'X-CSRFToken': csrf
            })
        };
    }

    public get(url) {
        return this.httpClient.get(url);
    }

    public post(url: string, element: any) {
        this.updateHttpOptions();
        return this.httpClient.post(url, element, this.httpOptions);
    }

    public put(url: string, element: any) {
        this.updateHttpOptions();
        return this.httpClient.put(url, element, this.httpOptions);
    }

    public delete(url: string) {
        this.updateHttpOptions();
        return this.httpClient.delete(url, this.httpOptions);
    }
}
