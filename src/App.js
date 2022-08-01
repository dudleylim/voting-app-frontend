import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ContextApi } from './components/ContextApi';
import PrivateRoute from './components/PrivateRoute';

import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';


function App() {
  return (
    <BrowserRouter>
    <ContextApi>
      <Header />
      <main>
        <Routes>
          <Route path='/' exact element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/signup' element={<SignupPage />}/>
        </Routes>
      </main>
    </ContextApi>
    </BrowserRouter>
  );
}

export default App;