import { use } from 'react';
import { Link } from 'react-router-dom';
import type {Product} from './interfaces/IProduct'
import ProductCard from './ProductCard';

interface ListProps{
    promise: Promise<Product[]>
}

const BENTO_PATTERN = ["span-2x2", "span-1x1", "span-1x1", "span-2x1"];

export default function List({ promise}: ListProps){
    const dados = use(promise);

    return (
        <div className='bento-grid'>
            <Link to='/products/new' className='bento-card no-underline span-1x2'>
                <p>Add new Product</p>
            </Link>

            {dados.map((product,index) => {
                const sizeClass = BENTO_PATTERN[index % BENTO_PATTERN.length];
                
                return(
                    <Link
                        key={product.id} 
                        to={`/products/${product.id}`} 
                        className="no-underline link"
                    >
                    <ProductCard
                        key={product.id}
                        {...product}
                        sizeClass = {sizeClass}
                    />
                    </Link>
                )
            })}
        </div>
    );
}