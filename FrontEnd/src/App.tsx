import { Routes, Route, Outlet, useLocation, useNavigate, Link} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import ProductsList from './components/Products/ProductLoaderList';
import SingleProduct from './components/Products/ProductLoaderSingle';
import ProductFormCreate from './components/Products/forms/ProductFormCreate';
import BentoPage from './components/BentoPage';
import ProductFormUpdate from './components/Products/forms/ProductFormUpdate';
import MaterialsList from './components/Materials/MaterialLoaderList';
import MaterialFormCreate from './components/Materials/forms/MaterialFormCreate';
import SingleMaterial from './components/Materials/MaterialLoaderSingle';
import MaterialFormUpdate from './components/Materials/forms/MaterialFormUpdate';
import BillOfMaterialsList from './components/BillOfMaterials/BillOfMaterialLoaderList';
import BillOfMaterialFormCreate from './components/BillOfMaterials/forms/BillOfMaterialFormCreate';
import BillOfMaterialSingle from './components/BillOfMaterials/BillOfMaterialLoaderSingle';

const queryClient = new QueryClient();

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('bento-theme') as 'light' | 'dark') || 'dark'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('bento-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleBack = () => {
  if (window.history.state && window.history.state.idx > 0) {
    navigate(-1);
  } else {
    navigate('/');
  }
};
  return (
    <div className="page-wrapper">
      <header>
        {!isHomePage && (
          <div className='link'>
            <Link to='/' className="back-button">
              Início
            </Link>
            <button onClick={handleBack} className="back-button">
              ← Voltar
            </button>
          </div>
        )}
        <button className="theme-toggle" onClick={toggleTheme}>
          Modo {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button> 
      </header>
    <main>
      <Outlet />
    </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BentoPage />} />
        <Route path="products">
          <Route index element={<ProductsList />} />         
          <Route path="new" element={<ProductFormCreate />} /> 
          
          <Route path=":id">
            <Route index element={<SingleProduct />} /> 
            <Route path="update" element={<ProductFormUpdate />} />
          </Route>
        </Route>
        <Route path="materials">
          <Route index element={<MaterialsList />} />         
          <Route path="new" element={<MaterialFormCreate />} /> 
          
          <Route path=":id">
            <Route index element={<SingleMaterial />} /> 
            <Route path="update" element={<MaterialFormUpdate />} />
          </Route>
        </Route>
        <Route path="boms">
          <Route index element={<BillOfMaterialsList />} />         
          <Route path="new" element={<BillOfMaterialFormCreate />} /> 
          
          <Route path=":id">
            <Route index element={<BillOfMaterialSingle />} /> 
          </Route>
        </Route>
      </Route>
    </Routes>
    </QueryClientProvider>
  );
}
