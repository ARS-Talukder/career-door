import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import SignUp from './Pages/Login/SignUp'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import auth from './firebase/firebase.config'
import { getUser, toggleLoading } from './features/auth/authSlice'
import { Toaster } from 'react-hot-toast'
import Header from './Pages/Shared/Header'
import Register from './Pages/Register/Register'
import PrivateRoute from './utils/PrivateRoute'
import Dashboard from './Pages/Dashboard/Dashboard'
import AddJob from './Pages/Dashboard/EmployerDashboard/AddJob'


function App() {
  const dispatch = useDispatch();

  // This is for authentication reload user loss problem
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.email));
      } else {
        dispatch(toggleLoading())
      }
    })
  }, [dispatch])
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />
        <Route path="/register/:type" element={<PrivateRoute><Register /></PrivateRoute>} />

        {/* ----Dashboard---- */}
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route index element={<AddJob />}></Route>
          {/* <Route path='/dashboard/addproduct' element={<AddProduct></AddProduct>}></Route> */}
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
