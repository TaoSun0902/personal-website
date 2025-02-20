import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Contact from './pages/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'works',
        element: <Works />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]);

export default router;