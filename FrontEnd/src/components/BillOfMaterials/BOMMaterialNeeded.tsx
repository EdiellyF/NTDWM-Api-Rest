import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles.css';
import type { BomMaterialNeeded } from './interfaces/IBillOfMaterial';
import { apiService } from '../../service/apiClient';

interface BOMCardProps extends BomMaterialNeeded{
  sizeClass?: string;
}

export const BOMMaterialNeededCard: React.FC<BOMCardProps> = 
({id, materialName, materialNeeded, materialId,  sizeClass = "" }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(materialNeeded);
  const navigate = useNavigate();

  async function handleSave() {
    try {
      await apiService.patch(`/boms/${id}/update`, {
        materialId: materialId,
        materialNeeded: quantity
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }
  
  async function handleDelete() {
    try {
      await apiService.delete(`/boms/${id}/delete`);
      navigate('/boms/')
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  return(
    <section className={`bento-card ${sizeClass}`}>
      <button onClick={() => setIsEditing(true)}>
        <div className="card-icon">#{materialId}</div>
      </button>
      <div className="card-content">
        <h3 className="card-title">{materialName}</h3>
        {isEditing ? (
          <>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="form-input"
            />
            <div className='edit-btn-wrapper'>
              <button onClick={handleSave}>✔</button>
              <button onClick={() => setIsEditing(false)}>✖</button>
              <button onClick={handleDelete}>Deletar</button>
            </div>
          </>
        ) : (
          <>
            <h3 className="card-desc">
              Quantidade Necessária {quantity}
            </h3>
          </>
        )}
      </div>
    </section>
  )
}

export default BOMMaterialNeededCard;