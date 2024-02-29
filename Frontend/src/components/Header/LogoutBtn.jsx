import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signOut } from "../../store/authSlice";

function LogoutBtn() {
  // dispatch will update the store value
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.get("/api/v1/users/logout");
      dispatch(signOut());
      navigate("/login");
    } catch (error) {
      console.log("Error while signing out", error);
    }
  };

  return (
    <Link to="/">
      <button
        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </Link>
  );
}

export default LogoutBtn;
