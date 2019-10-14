export enum PurchaseOrderStatus {
    APPROVED = 'APPROVED',
    CANCELLED = 'CANCELLED',
    CREATED= 'CREATED',
    DELIVERED = 'DELIVERED'
}

export interface PurchaseOrder {
    id?: number;
    product_list: Array<ProductOrder>;
    orderDate: Date;
    requestedDate: Date;
    requestedDepartment: string;
    remarks?: string;
    purchaseStatus?: PurchaseOrderStatus;
}

export interface ProductOrder {
    id?: string;
    vendorID: number;
    productID: number;
    quantity: number;
}

export interface PurchaseOrderTableInput {
    productName: string;
    productDescription: string;
    vendorName: string;
    quantity: number;
    price: number;
}
