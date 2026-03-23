export interface BillOfMaterial {
    id?: number,
    productName: string,
    materialName: string,
    materialNeeded: number
}

export interface BillOfMaterialFocus {
    productId: number,
    productName: string
}

export interface BillOfMaterialMaterials {
    id?: number,
    productId: number,
    productName: string,
    materialName?: string,
    materialNeeded?: number
}

export interface BomMaterialNeeded {
    id?: number,
    materialName: string,
    materialNeeded: number,
    materialId: number
}

export interface BOMCreate {
    productId: number,
    materialId: number,
    materialNeeded: number
}