import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import DealPanel from './components/DealPanel';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<HomePage />}>
              <Route index />
              <Route path="page/:pageNumber" element={null} />
              <Route path="page/:pageNumber/:dealId" element={<DealPanel />} />
            </Route>
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />}></Route>
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
