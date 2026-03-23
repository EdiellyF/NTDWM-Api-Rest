import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles.css';
import '../../form.css';
import { apiService } from '../../../service/apiClient';
import type { MaterialFormData, MaterialFormErrors } from '../interfaces/IMaterialForm';
import { validateMaterial } from '../validators/FormValidatorMaterial';
import type { Material } from '../interfaces/IMaterial';
import { useQueryClient } from '@tanstack/react-query';

export default function MaterialFormCreate(){
  const [formData, setFormData] = useState<MaterialFormData>({ name: '' });
  const [errors, setErrors] = useState<MaterialFormErrors>({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

 async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const validationErrors = validateMaterial(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try { 
      await apiService.post<string, Material>('/materials/create',{
      name: formData.name,
      amountStored: 0
    });

    await queryClient.invalidateQueries({ queryKey: ['materials'] });

    navigate('/materials');
    }catch (error){
        console.log("Erro ao registrar a máteria-prima: ", error)
    }
  }

    return(
        <div className="bento-form">
            <h1>Registre uma nova Máteria-Prima</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-group form-label">
                    Nome
                    <input 
                    id="name" 
                    className="form-input" 
                    type="text" 
                    name="name" 
                    placeholder="Parafuso"
                    value={formData.name}
                    onChange={handleChange}
                /> 
                {errors.name && (<span className="form-error">{errors.name}</span>)}
                </label>
                <button 
                type="submit" 
                className="form-button"
                >Registrar</button>
            </form>
        </div>
    )
}