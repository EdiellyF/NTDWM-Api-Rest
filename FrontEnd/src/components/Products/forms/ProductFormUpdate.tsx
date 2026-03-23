import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles.css';
import '../../form.css';
import { apiService } from '../../../service/apiClient';
import type { ProductFormData, ProductFormErrors } from '../interfaces/IProductForm';
import { validateProduct } from '../validators/FormValidator';
import type { Product } from '../interfaces/IProduct';


export default function ProductFormUpdate(){
  const [formData, setFormData] = useState<ProductFormData>({ name: '', value: '', amountStored: '' });
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    async function loadProduct() {
      const product = await apiService.get<ProductFormData>(
        `/products/${id}`
      );

      setFormData({
        name: product.name,
        value: String(product.value),
        amountStored: product.amountStored
      });
  }

    if (id) loadProduct();
  }, [id]);


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
    await apiService.patch<Product>(`/products/${id}/update`, {
      name: formData.name,
      value: Number(formData.value),
      amountStored: Number(formData.amountStored)
    });

    setFormData({ name: '', value: '', amountStored: '' });
    setErrors({});

    navigate(`/products/${id}`);
    
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
  }
  }

    return(
        <div className="bento-form">
            <h1>Atualização de Produtos</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-group form-label">
                    Nome
                    <input 
                    id="name" 
                    className="form-input" 
                    type="text" 
                    name="name" 
                    placeholder={formData.name}
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
                    placeholder={formData.value}
                    value={formData.value}
                    onChange={handleChange}
                /> 
                {errors.value && (<span className="form-error">{errors.value}</span>)}
                </label>
                <label className="form-group form-label">
                    Quantidade em Estoque
                    <input 
                    id="amountStored" 
                    className="form-input" 
                    type="number" 
                    name="amountStored" 
                    placeholder={formData.amountStored} 
                    value={formData.amountStored}
                    onChange={handleChange}
                /> 
                {errors.amountStored && (<span className="form-error">{errors.amountStored}</span>)}
                </label>
                <button 
                type="submit" 
                className="form-button"
                >Registrar</button>
            </form>
        </div>
    )
}