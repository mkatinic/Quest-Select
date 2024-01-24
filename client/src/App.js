import './App.scss';
import Layout from './Components/Layout';
import { Routes, Route } from 'react-router-dom';
import GameSearch from './Components/GameSearch';
import Profile from './Components/ProfileCreation';
import HomePage from './Components/HomePage';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/search' element={<GameSearch />} />
        <Route path='/login' element={<Profile />} />
      </Route>
    </Routes>
    </>
  )
}

export default App;
