import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles.css';
import '../../form.css';
import { apiService } from '../../../service/apiClient';
import type { ProductFormData, ProductFormErrors } from '../interfaces/IProductForm';
import { validateProduct } from '../validators/FormValidator';
import type { Product } from '../interfaces/IProduct';
import { useQueryClient } from '@tanstack/react-query';



export default function ProductFormCreate(){
  const [formData, setFormData] = useState<ProductFormData>({ name: '', value: '' });
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

 async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const validationErrors = validateProduct(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try { 
      await apiService.post<string, Product>('/products/create',{
      name: formData.name,
      value: Number(formData.value),
      amountStored: 0
    });

    await queryClient.invalidateQueries({ queryKey: ['products'] });

    navigate('/products');
    }catch (error){
        console.log("Erro ao registrar produto: ", error)
    }
  }

    return(
        <div className="bento-form">
            <h1>Registre um novo Produto</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-group form-label">
                    Nome
                    <input 
                    id="name" 
                    className="form-input" 
                    type="text" 
                    name="name" 
                    placeholder="Cadeira"
                    value={formData.name}
                    onChange={handleChange}
                /> 
                {errors.name && (<span className="form-error">{errors.name}</span>)}
                </label>
                <label className="form-group form-label">
                    Valor
                    <input 
                    id="value" 
                    className="form-input" 
                    type="number" 
                    name="value" 
                    placeholder="10,00"
                    value={formData.value}
                    onChange={handleChange}
                /> 
                {errors.value && (<span className="form-error">{errors.value}</span>)}
                </label>
                <button 
                type="submit" 
                className="form-button"
                >Registrar</button>
            </form>
        </div>
    )
}