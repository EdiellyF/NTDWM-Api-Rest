import type { Product } from './interfaces/IProduct';
import { formatPTBR } from '../../util/Formatter';
import '../styles.css';

interface ProductCardProps extends Product{
  sizeClass?: string;
}

export const ProductCard: React.FC<ProductCardProps> = 
({id, name ,value, amountStored, sizeClass = "" }) => 
  <section className={`bento-card ${sizeClass}`}>
    <div className="card-icon">#{id}</div>
    <div className="card-content">
      <h3 className="card-title">{name}</h3>
      <p className="card-desc">Valor: {formatPTBR(value)}</p>
      <p className="card-desc">Quantidade em Estoque: {amountStored}</p>
    </div>
  </section>
;

export default ProductCard;