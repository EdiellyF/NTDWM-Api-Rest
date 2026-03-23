import type { BOMFormData, BOMFormErrors } from "../interfaces/IBillOfMaterialForm";

export function validateBillOfMaterial(formData: BOMFormData): BOMFormErrors {
  const errors: BOMFormErrors = {};
  
  if (!formData.materialNeeded) {
    errors.materialNeeded = 'A quantidade máteria-prima não pode estar vázia';
  } else if (Number(formData.materialNeeded) < 0) {
    errors.materialNeeded = 'A quantidade máteria-prima não pode ser negativa';
  }
  
  return errors;
}