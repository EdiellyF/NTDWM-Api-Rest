export interface MaterialFormData{
  name: string,
  amountStored?: string
}

export interface MaterialFormErrors {
  name?: string;
  amountStored?: string;
}