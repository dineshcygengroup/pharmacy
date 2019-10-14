import { PurchaseOrderStatus } from './purchase-order';

export interface PurchaseOrderSummaryTable {
        id?: number;
        orderDate: Date;
        requestedDate: Date;
        requestedDepartment: string;
        remarks?: string;
        purchaseStatus?: PurchaseOrderStatus;
        productName: string;
        vendorName: string;
        quantity: number;
        price: number;
}
