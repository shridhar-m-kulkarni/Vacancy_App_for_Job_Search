import MainPage from "./components/MainPage";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import JobPage from "./components/JobPage";

import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoutes/ProtectedRoutes";
import PublicRoute from "./ProtectedRoutes/PublicRoutes";
import Logout from "./components/logout";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import ProfilePic from "./components/ProfilePic";

const App = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/About" element={<About/>} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="*" element={<Error/>}/>



      </Route>

      

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/JobPage" element={<JobPage />} />

        <Route path="/ProfilePic" element={<ProfilePic />} />

        <Route path="/Logout" element={<Logout/>} />


      </Route>





    </Routes>
  );
};

export default App;