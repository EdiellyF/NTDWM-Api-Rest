import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles.css';
import '../../form.css';
import { apiService } from '../../../service/apiClient';
import type { MaterialFormData, MaterialFormErrors } from '../interfaces/IMaterialForm';
import { validateMaterial } from '../validators/FormValidatorMaterial';
import type { Material } from '../interfaces/IMaterial';


export default function MaterialFormUpdate(){
  const [formData, setFormData] = useState<MaterialFormData>({ name: '', amountStored: '' });
  const [errors, setErrors] = useState<MaterialFormErrors>({});
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    async function loadMaterial() {
      const product = await apiService.get<MaterialFormData>(
        `/materials/${id}`
      );

      setFormData({
        name: product.name,
        amountStored: product.amountStored
      });
  }

    if (id) loadMaterial();
  }, [id]);


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
    await apiService.patch<Material>(`/materials/${id}/update`, {
      name: formData.name,
      amountStored: Number(formData.amountStored)
    });

    setFormData({ name: '', amountStored: '' });
    setErrors({});

    navigate(`/materials/${id}`);
    
  } catch (error) {
    console.error("Erro ao atualizar máteria-prima:", error);
  }
  }

    return(
        <div className="bento-form">
            <h1>Atualização de Máterias-Primas</h1>
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