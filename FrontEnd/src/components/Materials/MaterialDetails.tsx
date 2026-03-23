import { use } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { Material } from './interfaces/IMaterial'
import '../styles.css';
import MaterialCard from './MaterialCard';
import { apiService } from '../../service/apiClient';

interface MaterialProps{
    promise: Promise<Material>
}

export default function MaterialDetails({promise}: MaterialProps) {
  const material = use(promise);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleDelete = async () => {
    try {
      await apiService.delete<Material>(`/materials/${id}/delete`, {
        data: {id: material.id}
      });

      navigate('/materials');
    } catch (error) {
      console.error('Erro ao deletar máteria-prima:', error);
    }
  };

  return (
    <div className='bento-grid'>
      <MaterialCard
      key={material.id}
      {...material}
      sizeClass = "span-2x2"
      />
      <Link to={`./update`} className='bento-card span-2x1 no-underline center'>
        Atualizar
      </Link>
      <button
        onClick={handleDelete}
        className="bento-card span-2x1 center"
      >
        Deletar
      </button>
    </div>
  );
}