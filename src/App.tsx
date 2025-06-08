import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Detail from './pages/Detail';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/:mid"
            element={
              <Layout>
                <Detail />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
