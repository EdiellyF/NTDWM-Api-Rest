import type { ProductFormData, ProductFormErrors } from "../interfaces/IProductForm";

export function validateProduct(formData: ProductFormData): ProductFormErrors {
  const errors: ProductFormErrors = {};

  if (!formData.name?.trim()) {
    errors.name = 'O nome é obrigatório';
  } else if (formData.name.length < 3) {
    errors.name = 'O nome deve ter pelo menos 3 caracteres';
  }

  if (!formData.value) {
    errors.value = 'O valor é obrigatório';
  } else if (Number(formData.value) <= 0) {
    errors.value = 'O valor deve ser maior que zero';
  }

  return errors;
}