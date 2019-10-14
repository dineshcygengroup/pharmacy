export interface Medicine {
    batchNumber: string,
    quantity: number,
    category: string,
    expiryDate: Date,
    genericName: string,
    id?: number,
    location: string,
    medicineDetails?: string,
    name: string,
    price: string,
    referenceLink?: string,
    supplier: string
}