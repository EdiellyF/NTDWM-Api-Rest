import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles.css';
import '../../form.css';
import { apiService } from '../../../service/apiClient';
import type { BOMFormData, BOMFormErrors } from '../interfaces/IBillOfMaterialForm';
import { validateBillOfMaterial } from '../validators/FormValidatorBOM';
import type { BillOfMaterial } from '../interfaces/IBillOfMaterial';


export default function BillOfMaterialFormUpdate(){
  const [formData, setFormData] = useState<BOMFormData>({ 
    product: '', 
    material: '',
    materialNeeded: ''
   });
  const [errors, setErrors] = useState<BOMFormErrors>({});
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    async function loadMaterial() {
      const billOfMaterial = await apiService.get<BOMFormData>(
        `/boms/${id}`
      );

      setFormData({
        product: billOfMaterial.product,
        material: billOfMaterial.material,
        materialNeeded: billOfMaterial.materialNeeded
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

    const validationErrors = validateBillOfMaterial(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

  try {
    await apiService.patch<BillOfMaterial>(`/boms/${id}/update`, {
      productId: Number(formData.product),
      materialId: Number(formData.material),
      materialNeeded: Number(formData.materialNeeded)
    });

    setFormData({ product: '', material: '', materialNeeded: '' });
    setErrors({});

    navigate(`/boms/${id}`);
    
  } catch (error) {
    console.error("Erro ao atualizar listagem de produção:", error);
  }
  }

    return(
        <div className="bento-form">
            <h1>Atualização de Lista de Produção</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-group form-label">
                    Quantidade em necessária para produção
                    <input 
                    id="materialNeeded" 
                    className="form-input" 
                    type="number" 
                    name="materialNeeded" 
                    placeholder={formData.materialNeeded} 
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