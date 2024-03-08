import React from "react";

const ForgotPass = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send email logic here
    // You can use fetch or axios to send a POST request to your backend API

    try {
      setError(false);
      const response = await fetch("/api/v1/users/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Email sent successfully
        console.log("Password reset email sent");
        setSuccess(true);
      } else {
        // Handle error
        setError(true);
        console.log("Failed to send password reset email");
      }
    } catch (error) {
      setError(true);
      console.log("Failed to send password reset email:", error);
    }
  };
  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  return (
    <div className="sm:min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {error ? (
            <p className="text-red-700 mt-2 text-center">
              {error} Something went wrong
            </p>
          ) : (
            ""
          )}
          {success && (
            <p className="text-green-700 mt-2 text-center">
              {" "}
              Password reset email sent
            </p>
          )}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Forgot Your <span className="">Password?</span>
          </h2>
          <p className="mt-2 text-center text-sm text-white">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-semibold rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm rounded-lg text-white bg-indigo-600 font-bold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              //   type="submit"
              onClick={handleSubmit}
            >
              {success ? "Email Sent" : " Send Reset Link "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;

// import React from "react";
// import axios from "axios";

// const ForgotPass = () => {
//   const handleSubmit = async () => {
//     try {
//       console.log("this is frontend email", email);
//       const res = await axios.post("/api/v1/users/forgot-password", {
//         email,
//       });

//       console.log("this is the response", res);

//       setSuccess(true);
//     } catch (error) {
//       setSuccess(false);
//       setError(true, error.message);
//       console.log(error?.message);
//     }
//     const [email, setEmail] = React.useState("");
//     const [success, setSuccess] = React.useState(false);
//     const [error, setError] = React.useState(false);
//     return (
//       <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
//         <form>
//           <label> Email</label>
//           <input
//             type="text"
//             placeholder="Enter Your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button onClick={handleSubmit}>Submit</button>
//         </form>
//       </div>
//     );
//   };
// };
// export default ForgotPass;

// import React from "react";
// import axios from "axios";

// const ForgotPass = () => {
//   const [email, setEmail] = React.useState("");
//   const [success, setSuccess] = React.useState(false);
//   const [error, setError] = React.useState(false);

//   const handleSubmit = async () => {
//     try {
//       setError(false);
//       console.log("this is frontend email", email);
//       const res = await axios.post("/api/v1/users/forgotPassword", {
//         email,
//       });
//       console.log("this is the response", res.data);
//       setError(false);
//       setSuccess(true);
//     } catch (error) {
//       setSuccess(false);
//       setError(true, error.message);
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
//         <form onSubmit={handleSubmit}>
//           <label> Email</label>
//           <input
//             type="email"
//             placeholder="Enter Your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPass;

// import React, { useState } from "react";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Send email logic here
//     // You can use fetch or axios to send a POST request to your backend API

//     try {
//       setError(false);
//       const response = await fetch("/api/v1/users/forgotPassword", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         // Email sent successfully
//         console.log("Password reset email sent");
//         setSuccess(true);
//       } else {
//         // Handle error
//         setError(true);
//         console.log("Failed to send password reset email");
//       }
//     } catch (error) {
//       setError(true);
//       console.log("Failed to send password reset email:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Forgot Your Password?
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Enter your email address and we'll send you a password reset link.
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <input type="hidden" name="remember" defaultValue="true" />
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>
//           {error && (
//             <p className="text-red-700 mt-2 text-center">
//               Something went wrong
//             </p>
//           )}

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Send Reset Link
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
