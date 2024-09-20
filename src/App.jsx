import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { rootRouter } from './routes/routes';

function App() {
  return (
    <RouterProvider router={rootRouter} />
  )
}

export default App;