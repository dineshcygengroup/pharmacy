
export enum PurchaseOrderStatus {
    RECEIVED = 'RECEIVED',
    RETURNED = 'RETURNED',
    CANCELLED = 'CANCELLED',
    ORDERED = 'ORDERED'
}

export interface PurchaseOrder {
    id?: number,
    medicine: string,
    supplier: string,
    quantity: number,
    medicineCategory: string,
    fullfillmentDate: Date,
    batchNumber?: String,
    expiryDate?: Date,
    costPrice?: number,
    maxRetailPrice?: number,
    paymentType?: string,
    purchaseTax?: number,
    orderStatus?: PurchaseOrderStatus.CANCELLED | PurchaseOrderStatus.ORDERED | PurchaseOrderStatus.RECEIVED | PurchaseOrderStatus.RETURNED,
    details?: string
}