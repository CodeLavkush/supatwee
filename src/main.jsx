import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, AddPost, Signin, Signup } from "./pages"
import { AuthLayout } from './components'
import store from './store/store'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/signin",
        element: <Signin/>,
      },
      {
        path: "/signup",
        element: <Signup/>,
      },
      {
        path: "/addpost",
        element: (
          <AuthLayout authentication>
            <AddPost/>
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
