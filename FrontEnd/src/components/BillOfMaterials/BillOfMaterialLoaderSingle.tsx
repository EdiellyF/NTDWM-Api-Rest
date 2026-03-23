import { Suspense } from 'react';
import { apiService } from '../../service/apiClient'
import type { BomMaterialNeeded, BillOfMaterialMaterials } from './interfaces/IBillOfMaterial'
import '../styles.css';
import { useParams } from 'react-router-dom';
import BillOfMaterialDetails from './BillOfMaterialDetails';

export default function BillOfMaterialSingle(){
    const { id } = useParams<{ id: string }>();
    const billOfMaterial = apiService.get<BillOfMaterialMaterials>(`/boms/product/${id}`);
    const materialNeeded = apiService.get<BomMaterialNeeded[]>(`/boms/product/${id}/materials`)
    
    return (
    <Suspense fallback={<p>Carrregando...</p>}>
        <BillOfMaterialDetails 
        productPromise = {billOfMaterial} 
        materialPromise = {materialNeeded}
        />
    </Suspense>
    )
}