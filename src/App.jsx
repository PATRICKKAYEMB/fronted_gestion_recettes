import {  Routes, Route } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import ListeRecettes from './recettes/ListesRecettes';
import AjouterRecette from './recettes/AjouterRecette';
import ProtectedRoute from './auth/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Revenue from './recettes/Revenue';
import DashBord from './recettes/DashBord';
import VoirDepense from './Depense/VoirDepense';
import AjouterDepense from './Depense/AjouterDepense';


function App() {
 

  return (
   <>
   
    <ToastContainer position="top-right" autoClose={3000} />
  
    <Routes>
      <Route path="/" element={<LoginPage />} />

        <Route element={<Layout/>}>
          <Route path='/revenue' element={<ProtectedRoute><Revenue/></ProtectedRoute>}/>
          <Route path="/voir_recettes" element={<ProtectedRoute><ListeRecettes /></ProtectedRoute>} />
          <Route path="/ajouter_recette" element={<ProtectedRoute><AjouterRecette /></ProtectedRoute>} />
          <Route path="/voir_depense" element={<ProtectedRoute><VoirDepense/></ProtectedRoute>} />
          <Route path='/ajouter_depense' element={<ProtectedRoute><AjouterDepense/></ProtectedRoute>} />
          <Route path='/DashBord' element={<ProtectedRoute><DashBord/></ProtectedRoute>}/>
        </Route>
    </Routes>
 
 
   
   </>
  )
}

export default App
