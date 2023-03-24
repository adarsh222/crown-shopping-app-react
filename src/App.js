import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';


const App = () => {
  const Shop =()=>{
    return <h1>Hola</h1>;
  }

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
          <Route path='' index end element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
      </Route>

    </Routes>
  );
};

export default App;