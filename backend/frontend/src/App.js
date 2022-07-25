import './App.css';
import HomePage from './pages/HomePage';
import {Routes,Route} from 'react-router-dom'
import Charts from './pages/Charts';
function App() {
  return (
    <>
    <Routes>

      <Route exact path='/' element={<HomePage />}/>
      <Route exact path='/charts' element={<Charts />}/>

    </Routes>
    </>
  );
}

export default App;
