import { use } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type {Product} from './interfaces/IProduct'
import '../styles.css';
import ProductCard from './ProductCard';
import { apiService } from '../../service/apiClient';

interface ProductProps{
    promise: Promise<Product>
}

export default function ProductDetails({promise}: ProductProps) {
  const product = use(promise);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleDelete = async () => {
    try {
      await apiService.delete<Product>(`/products/${id}/delete`, {
        data: {id: product.id}
      });

      navigate('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className='bento-grid'>
      <ProductCard
      key={product.id}
      {...product}
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