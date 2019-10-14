export enum SaleStatus {
    PAID = 'PAID',
    NOTPAID = 'NOTPAID',
    CANCELLED = 'CANCELLED'
}

export class SaleOrder {
    id?: number;
    customer: string;
    patientName: string;
    referredDoctorName: string;
    medicineName: string;
    category: string;
    quantity: number;
    sellingPrice: number;
    stockAvailable: number;
    saleStatus: SaleStatus.CANCELLED | SaleStatus.NOTPAID | SaleStatus.PAID;
    total: number;
}