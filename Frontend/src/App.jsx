import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Blog from "./Pages/Blog"
import Logout from "./Pages/Logout"
import SingleBlog from "./Blogs/SingleBlog"
import AdminProtected from "./ProtectedRoutes/AdminProtected"
import AddBlog from "./Blogs/AddBlog"
import UpdateBlog from "./Blogs/UpdateBlog"
import Details from "./Blogs/Details"
import PrivacyPolicy from "./Pages/PrivacyPolicy"
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/blog" element={<Blog />}>  </Route>
        <Route path="/blog/:id" element={<SingleBlog />}></Route>
        <Route path="/add-blog" element={<AdminProtected/>}>
        <Route path="" element={<AddBlog/>}/>
        <Route path="update-blog/:id" element={<UpdateBlog/>}/>
        <Route path="create-blog" element={<Details/>}/>
        </Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        

      </Routes>
    </>
  )
}

export default App
