import React from "react";
import "./App.css";
// import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

function App() {
  //for the loader
  // dispatcher is use to modify the or change the store with reducer

  // // automatically call when the app is loaded and authservice is the object
  // useEffect(() => {
  //   authService
  //     .getCurrentUser()
  //     .then((userData) => {
  //       if (userData) {
  //         dispatch(login({ userData }));
  //       } else {
  //         dispatch(logout());
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  return (
    <div className="min-h-screen  flex flex-wrap content-between bg-[#10172a] ">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Toaster />
        <Footer />
      </div>
    </div>
  );
}

export default App;
