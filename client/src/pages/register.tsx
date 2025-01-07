import { FC, useState} from "react";

interface registerFormInterface {
  showPassword: boolean;
  togglePasswordVisibility: ()=> void;
 }

function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen w-screen">
      <div className="hidden md:block md:col-span-7">
        <img
          src="/basantapur.jpg"
          alt="bhaktapur"
          className="h-full w-full object-cover rounded-r-3xl"
        />
      </div>

      <div className="col-span-1 md:col-span-5 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-6">Create an account</h1>
        <LoginForm
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      </div>
    </div>
  );
}

const LoginForm: FC<registerFormInterface> = ({ showPassword, togglePasswordVisibility }) => {

  return (
    <form className="flex flex-col gap-4 w-full max-w-md">
      {/* Email Field */}
      <div className="flex flex-col">
        <label htmlFor="username" className="mb-2 font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="border p-2 rounded-lg"
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border p-2 rounded-lg"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 font-medium">
          Phone Number
        </label>
        <input
          type="number"
          id="phnNumber"
          className="border p-2 rounded-lg"
          placeholder="Enter your phone number"
          required
        />
      </div>

      <div className="flex flex-col relative">
        <label htmlFor="password" className="mb-2 font-medium">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="border p-2 rounded-lg pr-10"
          placeholder="Enter your password"
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223a10.477 10.477 0 000 7.554C5.886 18.355 8.824 20.25 12 20.25c3.176 0 6.114-1.895 8.02-4.473a10.477 10.477 0 000-7.554C18.114 5.645 15.176 3.75 12 3.75c-3.176 0-6.114 1.895-8.02 4.473z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223a10.477 10.477 0 000 7.554C5.886 18.355 8.824 20.25 12 20.25c3.176 0 6.114-1.895 8.02-4.473a10.477 10.477 0 000-7.554C18.114 5.645 15.176 3.75 12 3.75c-3.176 0-6.114 1.895-8.02 4.473z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5"
              />
            </svg>
          )}
        </button>
      </div>

      <button className="bg-blue-500 p-2 rounded-lg text-white font-semibold hover:bg-blue-600">
        Sign up
      </button>

      <div className="flex flex-col items-center gap-2 mt-4">
        <p className="text-gray-500">Or Signup With</p>
        <button className="flex items-center gap-2 border border-black p-2 rounded-lg hover:bg-gray-100">
          <img src="/google.png" alt="Google" className="h-6" />
          Signup with Google
        </button>
      </div>

      <div className="text-center mt-4">
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 font-semibold">
            Login
          </a>
        </p>
      </div>
    </form>
  );
}

export default Register;

// {/* <form action="#" className="flex flex-col gap-4 w-3/4">
// {/* Username */}
// <div className="flex flex-col">
//   <label>Username</label>
//   <input
//     type="text"
//     className="border p-2 rounded-lg"
//     placeholder="Enter your username"
//   />
// </div>
// {/* Email */}
// <div className="flex flex-col">
//   <label>Email</label>
//   <input
//     type="email"
//     className="border p-2 rounded-lg"
//     placeholder="Enter your email"
//   />
// </div>
// {/* Phone */}
// <div className="flex flex-col">
//   <label>Phone Number</label>
//   <input
//     type="number"
//     className="border p-2 rounded-lg"
//     placeholder="Enter your phone number"
//   />
// </div>
// {/* Password */}
// <div className="flex flex-col relative">
//   <label className="mb-2">Password</label>
//   <input
//     type={showPassword ? "text" : "password"}
//     className="border p-2 rounded-lg pr-10"
//     placeholder="Enter your password"
//   />
//   <button
//     type="button"
//     onClick={togglePasswordVisibility}
//     className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
//   >
//     {showPassword ? (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth="2"
//         stroke="currentColor"
//         className="w-6 h-6"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M3.98 8.223a10.477 10.477 0 000 7.554C5.886 18.355 8.824 20.25 12 20.25c3.176 0 6.114-1.895 8.02-4.473a10.477 10.477 0 000-7.554C18.114 5.645 15.176 3.75 12 3.75c-3.176 0-6.114 1.895-8.02 4.473z"
//         />
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//         />
//       </svg>
//     ) : (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth="2"
//         stroke="currentColor"
//         className="w-6 h-6"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M3.98 8.223a10.477 10.477 0 000 7.554C5.886 18.355 8.824 20.25 12 20.25c3.176 0 6.114-1.895 8.02-4.473a10.477 10.477 0 000-7.554C18.114 5.645 15.176 3.75 12 3.75c-3.176 0-6.114 1.895-8.02 4.473z"
//         />
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M9.75 9.75l4.5 4.5"
//         />
//       </svg>
//     )}
//   </button>
// </div>
// <button className="bg-blue-500 p-2 rounded-lg text-white">
//   Sign Up
// </button>
// <div className="flex flex-col items-center gap-2">
//   <p>Or With</p>
// </div>
// <button className="flex items-center gap-2 border border-black p-2 rounded-lg">
//   <img src="../../public/google.png" alt="logo" className="h-6" />
//   Login with Google
// </button>
// <div className="flex justify-center">
//   <p className="flex gap-2">
//     Already have an account?
//     <a href="/login" className="text-blue-500 font-semibold">
//       Login
//     </a>
//   </p>
// </div>
// </form> */}
