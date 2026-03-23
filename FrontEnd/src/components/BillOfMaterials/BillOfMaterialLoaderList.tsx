import { Suspense } from 'react';
import { apiService } from '../../service/apiClient'
import BillOfMaterialList from './BillOfMaterial';
import type { BillOfMaterialMaterials } from './interfaces/IBillOfMaterial'
import '../styles.css';

export default function BillOfMaterialsList(){
    const billOfMaterials = apiService.get<BillOfMaterialMaterials[]>('/boms/');
    return (
    <Suspense fallback={<p>Carrregando...</p>}>
        <BillOfMaterialList promise = {billOfMaterials}/>
    </Suspense>
    )
}