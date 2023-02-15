import { Route, Routes } from "react-router";
import AddEducation from "./Pages/AddEducation";
import AddExperience from "./Pages/AddExperience";
import CreateProfile from "./Pages/CreateProfile";
import Dashboard from "./Pages/Dashboard";
import EditProfile from "./Pages/EditProfile";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import NoPage from "./Pages/NoPage";
import Posts from "./Pages/Posts";
import Profiles from "./Pages/Profiles";
import Register from "./Pages/Register";
import SinglePost from "./Pages/SinglePost";
import UserProfile from "./Pages/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-profile" element={<CreateProfile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/add-experience" element={<AddExperience />} />
      <Route path="/add-education" element={<AddEducation />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:postId" element={<SinglePost />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
