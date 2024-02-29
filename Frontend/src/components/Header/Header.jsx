import React from "react";
import { LogoutBtn, Logo, Container } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  // To Access the store we use UseSelector
  const authStatus = useSelector((state) => state.auth.status);
  // useNavigate is also like a router
  const navigate = useNavigate();

  const navItem = [
    {
      name: "Home",
      slug: "/", //url
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3  shadow bg-[#3f418d] border-b-4 border-white text-[#f9eded] ">
      <Container>
        <nav className="flex items-center font-bold text-lg ">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItem.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200  hover:text-[#3f418d] hover:bg-[#f9eded] rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
