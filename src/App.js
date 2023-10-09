import './App.css';
import HomePage from './components/HomePage';
import Navbar from './components/NavBar.js';
import { Routes, Route } from 'react-router-dom';
import './Styles/ProductsImage.css'
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import ProductDetails from './components/ProductDetails';
import CreateProductButton from './components/CreateProductButton.js';

const queryClient=new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div class='app-container'>
      <div>
        <Navbar/>
        <CreateProductButton/>
      </div>
      <Routes>
        <Route path="/" element={ <HomePage/>}/>
        <Route path="/products/:id" element ={<ProductDetails/>}/>
      </Routes>
    </div>
    </QueryClientProvider>
  );
}

export default App;
