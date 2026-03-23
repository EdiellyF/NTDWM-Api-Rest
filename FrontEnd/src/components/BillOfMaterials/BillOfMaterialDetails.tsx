import { use } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BillOfMaterial, BillOfMaterialMaterials, BomMaterialNeeded } from './interfaces/IBillOfMaterial'
import '../styles.css';
import BillOfMaterialCard from './BillOfMaterialCard';
import { apiService } from '../../service/apiClient';
import BOMMaterialNeededCard from './BOMMaterialNeeded';

interface BillOfMaterialProps{
  productPromise: Promise<BillOfMaterialMaterials>,
  materialPromise: Promise<BomMaterialNeeded[]>
}

export default function BillOfMaterialDetails(
  {productPromise, materialPromise}: BillOfMaterialProps) {

  const billOfMaterial = use(productPromise);
  const BOMMaterialNeeded = use(materialPromise);
  const navigate = useNavigate();

 const handleDelete = async () => {
    try {
      BOMMaterialNeeded.forEach(m => (
         apiService.delete<BillOfMaterial>(`/boms/${m.id}/delete`, {
          data: {id: m.id}
        })
      ));
      navigate('/boms');
    } catch (error) {
      console.error('Erro ao deletar Lista de Produção:', error);
    }
  };

  return (
    <div className='bento-grid'>
      <BillOfMaterialCard
      key={billOfMaterial.productId}
      {...billOfMaterial}
      sizeClass = "span-2x2"
      />
      <button
        onClick={handleDelete}
        className="bento-card center delete-overlay"
      >
        Deletar Listagem Completa
      </button>
      <div className='link'>
        {BOMMaterialNeeded.map(info => (
          <BOMMaterialNeededCard
          key={info.id}
          {...info}
          />
        ))}
      </div>
    </div>
  );
}