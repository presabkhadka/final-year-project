import { useState } from "react";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <>
      <div className="grid grid-cols-1 h-screen w-screen md:hidden">
        <div className="flex flex-col items-center mt-16 gap-6">
          <div>
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-center">Explore them all!</p>
          </div>
          <form action="#" className="flex flex-col gap-4 w-3/4">
            {/* username */}
            <div className="flex flex-col">
              <label>Username</label>
              <input
                type="text"
                className="border p-2 rounded-lg"
                placeholder="Enter your username"
              />
            </div>
            {/* email */}
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="text"
                className="border p-2 rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            {/* phone */}
            <div className="flex flex-col">
              <label>Phone Number</label>
              <input
                type="number"
                className="border p-2 rounded-lg"
                placeholder="Enter your phone number"
              />
            </div>
            {/* Password */}
            <div className="flex flex-col relative">
              <label className="mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="border p-2 rounded-lg pr-10"
                placeholder="Enter your password"
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
            <button className="bg-blue-500 p-2 rounded-lg text-white">
              Sign Up
            </button>
            <div className="flex flex-col items-center gap-2">
              <p>Or With</p>
            </div>
            <button className="flex items-center gap-2 border border-black p-2 rounded-lg">
              <img src="../../public/google.png" alt="logo" className="h-6" />
              Login with Google
            </button>
            <div className="flex justify-center">
              <p>
                Already have an account ?
                <a href="#" className="text-blue-500">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:grid md:grid-cols-12 md:h-screen md:w-screen ">
        <div className="col-span-7">
          <img
            src="../../public/basantapur.jpg"
            alt="bhaktapur"
            className="h-full rounded-3xl"
          />
        </div>
        <div className="col-start-9 col-end-12">
          <div className="flex flex-col items-center mt-16 gap-6">
            <h1 className="text-2xl font-bold">Hi, Welcome Back! 👋</h1>
            <form action="#" className="flex flex-col gap-4 w-3/4">
              {/* username */}
              <div className="flex flex-col">
                <label>Username</label>
                <input
                  type="text"
                  className="border p-2 rounded-lg"
                  placeholder="Enter your username"
                />
              </div>
              {/* email */}
              <div className="flex flex-col">
                <label>Email</label>
                <input
                  type="text"
                  className="border p-2 rounded-lg"
                  placeholder="Enter your email"
                />
              </div>
              {/* phone */}
              <div className="flex flex-col">
                <label>Phone Number</label>
                <input
                  type="number"
                  className="border p-2 rounded-lg"
                  placeholder="Enter your phone number"
                />
              </div>
              {/* Password */}
              <div className="flex flex-col relative">
                <label className="mb-2">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="border p-2 rounded-lg pr-10"
                  placeholder="Enter your password"
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
              <button className="bg-blue-500 p-2 rounded-lg text-white">
                Sign Up
              </button>
              <div className="flex flex-col items-center gap-2">
                <p>Or With</p>
              </div>
              <button className="flex items-center gap-2 border border-black p-2 rounded-lg">
                <img src="../../public/google.png" alt="logo" className="h-6" />
                Login with Google
              </button>
              <div className="flex justify-center">
                <p>
                  Already have an account ?
                  <a href="#" className="text-blue-500">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
