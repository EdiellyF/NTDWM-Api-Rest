import type { Material } from './interfaces/IMaterial';
import '../styles.css';

interface MaterialCardProps extends Material{
  sizeClass?: string;
}

export const MaterialCard: React.FC<MaterialCardProps> = 
({id, name , amountStored, sizeClass = "" }) => 
  <section className={`bento-card ${sizeClass}`}>
    <div className="card-icon">#{id}</div>
    <div className="card-content">
      <h3 className="card-title">{name}</h3>
      <p className="card-desc">Quantidade em Estoque: {amountStored}</p>
    </div>
  </section>
;

export default MaterialCard;