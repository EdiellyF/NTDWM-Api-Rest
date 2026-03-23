
import { BentoCard } from './Bento/BentoCard';
import { Link } from 'react-router-dom';
import './styles.css';

export default function BentoPage() {
  return (
      <main className="bento-grid">
        <Link to="/products" className='no-underline link'>
          <BentoCard 
            title="Produto" 
            desc="Gerencie seus Produtos" 
            icon="🔒" 
            sizeClass="span-2x2" 
          />
        </Link>
        <Link to='/materials' className='no-underline link'>
          <BentoCard 
            title="Matéria-Prima" 
            desc="Gerencie suas máterias-primas"
            icon="🌐" 
            sizeClass="span-2x1" 
          />
        </Link>
        <Link to='/boms' className='no-underline link'>
          <BentoCard 
            title="Lista Técnica" 
            desc="Gerencie a listagem de máterias-primas necessárias para manufatura de um Produto" 
            icon="📊" 
            sizeClass="span-2x1" 
          />
        </Link>
      </main>
  );
}
