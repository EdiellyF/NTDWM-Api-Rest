import { use } from 'react';
import { Link } from 'react-router-dom';
import type { Material } from './interfaces/IMaterial'
import MaterialCard from './MaterialCard';

interface ListProps{
    promise: Promise<Material[]>
}

const BENTO_PATTERN = ["span-2x2", "span-1x1", "span-1x1", "span-2x1"];

export default function ListMaterial({ promise}: ListProps){
    const dados = use(promise);

    return (
        <div className='bento-grid'>
            <Link to='/materials/new' className='bento-card no-underline span-1x2'>
                <p>Add new Product</p>
            </Link>

            {dados.map((material,index) => {
                const sizeClass = BENTO_PATTERN[index % BENTO_PATTERN.length];
                
                return(
                    <Link
                        key={material.id} 
                        to={`/materials/${material.id}`} 
                        className="no-underline link"
                    >
                    <MaterialCard
                        key={material.id}
                        {...material}
                        sizeClass = {sizeClass}
                    />
                    </Link>
                )
            })}
        </div>
    );
}