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
          <button class="group relative inline-flex items-center overflow-hidden rounded-full  px-12 py-3 text-lg font-medium text-white hover:bg-gray-50 hover:text-[#1a1a1a]">
            <span class="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
            <span class="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-2">
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span class="relative transform duration-700 group-hover:-translate-x-3 font-bold">
              Logout
            </span>
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
