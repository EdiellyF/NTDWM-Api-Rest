import { use } from 'react';
import { Link } from 'react-router-dom';
import type { BillOfMaterialMaterials } from './interfaces/IBillOfMaterial'
import BillOfMaterialCard from './BillOfMaterialCard';

interface ListProps{
    promise: Promise<BillOfMaterialMaterials[]>
}

const BENTO_PATTERN = ["span-2x2", "span-1x1", "span-1x1", "span-2x1"];

export default function BillOfMaterialList({ promise}: ListProps){
    const dados = use(promise);

    return (
        <div className='bento-grid'>
            <Link to='/boms/new' className='bento-card no-underline span-1x2'>
                <p>Adicionar uma nova Lista de Produção</p>
            </Link>

            {dados.map((billOfMaterial,index) => {
                const sizeClass = BENTO_PATTERN[index % BENTO_PATTERN.length];
                
                return(
                    <Link
                        key={billOfMaterial.productId} 
                        to={`/boms/${billOfMaterial.productId}`} 
                        className="no-underline link"
                    >
                    <BillOfMaterialCard
                        key={billOfMaterial.productId}
                        {...billOfMaterial}
                        sizeClass = {sizeClass}
                    />
                    </Link>
                )
            })}
        </div>
    );
}