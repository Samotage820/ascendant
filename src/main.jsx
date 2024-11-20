import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Outlet } from 'react-router-dom'
import './main.css'
import Home from './Home.jsx'
import Header from './Header.jsx'
import CharacterWrapper from './Character.jsx'
import Footer from './Footer.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
      path: "/",
      element: <Home />,
    },
      {
        path: "characters/:name",
        element: <CharacterWrapper />,
      },
      {
        path: "characters/:name",
        element: <CharacterWrapper />,
      },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <RouterProvider router = {router} />
  // </StrictMode>
)