import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signOut } from "../../store/authSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
      <AlertDialog>
        <AlertDialogTrigger>
          {" "}
          <button className="inline-bock px-6 py-2 duration-200 hover:bg-[#f5f5f5]  hover:text-indigo-500 ">
            Logout
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader className="">
            <AlertDialogTitle className="text-gray-800">
              Do you want to logout ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              This action cannot be undone. You will be signed out.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="">
            <AlertDialogCancel className="text-gray-600 hover:text-gray-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="text-white bg-red-500 hover:bg-red-600"
              onClick={logoutHandler}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Link>
  );
}

export default LogoutBtn;
