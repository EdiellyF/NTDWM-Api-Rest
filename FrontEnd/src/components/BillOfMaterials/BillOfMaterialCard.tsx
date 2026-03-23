import '../styles.css';
import type { BillOfMaterialFocus } from './interfaces/IBillOfMaterial';

interface BOMCardProps extends BillOfMaterialFocus{
  sizeClass?: string;
}

export const BillOfMaterialCard: React.FC<BOMCardProps> = 
({productId, productName, sizeClass = "" }) => 
  <section className={`bento-card ${sizeClass}`}>
    <div className="card-icon">#{productId}</div>
    <div className="card-content">
      <h3 className="card-title">{productName}</h3>
    </div>
  </section>
;

export default BillOfMaterialCard;