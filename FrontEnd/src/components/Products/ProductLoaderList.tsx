import { Suspense } from 'react';
import { apiService } from '../../service/apiClient'
import List from './Product';
import type {Product} from './interfaces/IProduct'
import '../styles.css';

export default function ProductsList(){
    const products = apiService.get<Product[]>('/products/');
    return (
    <Suspense fallback={<p>Carrregando...</p>}>
        <List promise = {Promise.resolve(products)}/>
    </Suspense>
    )
}