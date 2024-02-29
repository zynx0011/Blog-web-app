import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// const Admin = () => {
// const naviagate = useNavigate();
// const dispatch = useDispatch();

// const { register, handleSubmit } = useForm();
// const sub = async (data) => {
//   try {
//     const userData = await authService.createAccount(data);
//     if (userData) {
//       const userData = await authService.getCurrentUser(userData);
//       if (userData) {
//         console.log("admin created");
//         naviagate("/admin-pannel");
//       }
//     }
//   } catch (error) {
//     console.log("appwrite :: admin error", error);
//   }
// };
//   return (
//     <form onSubmit={handleSubmit(sub)}>
//       <div className="p-4 w-full min-h-screen flex justify-center items-center bg-slate-300  ">
//         <div className="flex w-[30%] flex-col m-auto space-y-7 bg-slate-400 p-7 rounded">
//           <Input
//             label="Email: "
//             placeholder="Enter your email"
//             type="email"
//             {...register("email", {
//               required: true,
//               validate: {
//                 matchPatern: (value) =>
//                   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                   "Email address must be a valid address",
//               },
//             })}
//           />
//           <Input
//             label="Password: "
//             type="password"
//             placeholder="Enter your password"
//             {...register("password", {
//               required: true,
//             })}
//           />
//           <Button type="submit" className="w-full">
//             Access Admin Pannel
//           </Button>
//         </div>
//       </div>
//     </form>
//     // <h1>kasjdf</h1>
//   );
// };

// export default Admin;

const Admin = () => {
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <a href="https://cloud.appwrite.io/console/organization-654d25bca09b3451591a">
        <button>Access Login Pannel</button>
      </a>
    </div>
  );
};

export default Admin;
