import { Suspense } from 'react';
import { apiService } from '../../service/apiClient'
import type { Material } from './interfaces/IMaterial'
import '../styles.css';
import { useParams } from 'react-router-dom';
import MaterialDetails from './MaterialDetails';

export default function SingleMaterial(){
    const { id } = useParams<{ id: string }>();
    const material = apiService.get<Material>(`/materials/${id}`);
    return (
    <Suspense fallback={<p>Carrregando...</p>}>
        <MaterialDetails promise = {Promise.resolve(material)}/>
    </Suspense>
    )
}