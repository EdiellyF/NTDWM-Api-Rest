export interface ProductFormData{
    name: string,
    value: string
    amountStored?: string
}

export interface ProductFormErrors {
  name?: string;
  value?: string;
  amountStored?: string;
}