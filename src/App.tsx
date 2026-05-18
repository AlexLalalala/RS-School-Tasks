import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import DealPanel from './components/DealPanel';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<HomePage />}>
            <Route index element={null} />
            <Route path="/:dealId" element={<DealPanel />} />
            <Route path="page/:pageNumber" element={null} />
            <Route path="page/:pageNumber/:dealId" element={<DealPanel />} />
          </Route>
          <Route path="about" element={<></>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
