import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles.css';
import '../../form.css';
import { apiService } from '../../../service/apiClient';
import type { BOMFormData, BOMFormErrors } from '../interfaces/IBillOfMaterialForm';
import { validateBillOfMaterial } from '../validators/FormValidatorBOM';
import type { BOMCreate } from '../interfaces/IBillOfMaterial';
import { useQueryClient } from '@tanstack/react-query';
import type { Product } from '../../Products/interfaces/IProduct';
import type { Material } from '../../Materials/interfaces/IMaterial';
import { useQuery } from '@tanstack/react-query';

export default function BillOfMaterialFormCreate(){

  const { data: products = []} = useQuery({
    queryKey: ['products'],
    queryFn: () => apiService.get<Product[]>('/products/')
  });
  const { data: materials = [] } = useQuery({
    queryKey: ['materials'],
    queryFn: () => apiService.get<Material[]>('/materials/')
   });

  const [formData, setFormData] = useState<BOMFormData>({ 
    product: '',
    material: '',
    materialNeeded: '' }
    );
    
  const [errors, setErrors] = useState<BOMFormErrors>({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData(prev => ({ ...prev, [name]: value }));
  }

 async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const validationErrors = validateBillOfMaterial(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try { 
        console.log(formData);
      await apiService.post<string, BOMCreate>('/boms/create',{
        productId: Number(formData.product),
        materialId: Number(formData.material),
        materialNeeded: Number(formData.materialNeeded)
    });

    await queryClient.invalidateQueries({ queryKey: ['boms'] });

    navigate('/boms');
    }catch (error){
        console.log("Erro ao registrar a máteria-prima: ", error)
    }
  }

    useEffect(() => {
        if (products.length > 0 && !formData.product) {
            setFormData(prev => ({
            ...prev,
            product: products[0].id
            }));
        }
        if (materials.length > 0 && !formData.material) {
            setFormData(pre => ({
            ...pre,
            material: materials[0].id
            }));
        }
    }, [products, formData.product, materials, formData.material]);

    return(
        <div className="bento-form">
            <h1>Registre uma nova Máteria-Prima</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-group form-label">
                    Escolha um produto
                    <select 
                    name="product" 
                    value={formData.product}
                    id="product" 
                    className='form-input' 
                    onChange={handleChange}>
                        {products.map(info =>(
                            <option key={info.id} value={info.id}>{info.name}</option>
                        ))}
                    </select>
                </label>
                <label className="form-group form-label">
                    Escolha uma máteria-prima
                     <select 
                     name="material" 
                     value={formData.material}
                     id="material" 
                     className='form-input' 
                     onChange={handleChange}>
                        {materials.map(info =>(
                            <option key={info.id} value={info.id}>{info.name}</option>
                        ))}
                    </select> 
                </label>
                <label className="form-group form-label">
                    Quantidade necessária para produção
                    <input 
                    id="materialNeeded" 
                    className="form-input" 
                    type="text" 
                    name="materialNeeded" 
                    placeholder="10"
                    value={formData.materialNeeded}
                    onChange={handleChange}
                /> 
                {errors.materialNeeded && (<span className="form-error">{errors.materialNeeded}</span>)}
                </label>
                <button 
                type="submit" 
                className="form-button"
                >Registrar</button>
            </form>
        </div>
    )
}