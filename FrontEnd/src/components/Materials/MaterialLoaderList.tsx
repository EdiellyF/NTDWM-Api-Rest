import { Suspense } from 'react';
import { apiService } from '../../service/apiClient'
import ListMaterial from './Material';
import type { Material } from './interfaces/IMaterial'
import '../styles.css';

export default function MaterialsList(){
    const materials = apiService.get<Material[]>('/materials/');
    return (
    <Suspense fallback={<p>Carrregando...</p>}>
        <ListMaterial promise = {Promise.resolve(materials)}/>
    </Suspense>
    )
}