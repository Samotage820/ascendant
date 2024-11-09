import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import CharacterWrapper from './Character.jsx'
import Header from './Header.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "characters/:name",
        element: <CharacterWrapper />,
      },
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>
)