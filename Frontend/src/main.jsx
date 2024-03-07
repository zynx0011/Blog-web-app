import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

import Home from "./components/pages/Home.jsx";
import Login from "./components/Login.jsx";
import { LogoutBtn, Signup } from "./components/index.js";
import AllPosts from "./components/pages/AllPosts.jsx";
import AddPost from "./components/pages/Addpost.jsx";
import EditPost from "./components/pages/EditPost.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoutes.jsx";
import PostCardPg from "./components/PostCardPg.jsx";
import Myposts from "./components/pages/Myposts.jsx";
import Profile from "./components/pages/Profile.jsx";
import ChangePass from "./components/pages/ChangePass.jsx";
import ForgotPass from "./components/pages/ForgotPass.jsx";
import ForgotpassPg from "./components/pages/NewPasswordPage.jsx";
import Search from "./components/pages/Search.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/signup",
//         element: <Signup />,
//       },
//       {
//         path: "/all-posts",
//         element: (
//           <AuthLayout authentication>
//             <AllPosts />{" "}
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/add-post",
//         element: (
//           <AuthLayout authentication>
//             <AddPost />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/edit-post/:slug",
//         element: (
//           <AuthLayout authentication>
//             <EditPost />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/post/:slug",
//         element: <Post />,
//       },
//       {
//         path: "/admin",
//         element: <Admin />,
//       },
//     ],
//   },
// ])
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}
      <Route path="/api/v1/users/forgotPassword" element={<ForgotPass />} />
      <Route path="/reset-password/:userId" element={<ForgotpassPg />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      // <Route path="/search?/" element={<Search />} />
      // {/* <Route path="/listing/:listingId" element={<ListingPg />} /> */}
      <Route element={<PrivateRoute />}>
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/logout" element={<LogoutBtn />} />
        <Route path="/edit-post/:slug" element={<EditPost />} />
        <Route path="/post/:id" element={<PostCardPg />} />
        <Route path="/my-posts/:id" element={<Myposts />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/change-password" element={<ChangePass />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
