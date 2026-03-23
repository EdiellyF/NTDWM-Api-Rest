export interface BOMFormData{
    product: string,
    material: string,
    materialNeeded: string
}

export interface BOMFormErrors {
    productName?: string,
    materialName?: string,
    materialNeeded?: string
}