import { Suspense } from 'react';
import { apiService } from '../../service/apiClient'
import type {Product} from './interfaces/IProduct'
import '../styles.css';
import { useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';

export default function SingleProduct(){
    const { id } = useParams<{ id: string }>();
    const product = apiService.get<Product>(`/products/${id}`);
    return (
    <Suspense fallback={<p>Carrregando...</p>}>
        <ProductDetails promise = {Promise.resolve(product)}/>
    </Suspense>
    )
}