import type { MaterialFormData, MaterialFormErrors } from "../interfaces/IMaterialForm";

export function validateMaterial(formData: MaterialFormData): MaterialFormErrors {
  const errors: MaterialFormErrors = {};

  if (!formData.name?.trim()) {
    errors.name = 'O nome é obrigatório';
  } else if (formData.name.length < 3) {
    errors.name = 'O nome deve ter pelo menos 3 caracteres';
  }
  
  return errors;
}