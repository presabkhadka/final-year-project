function Login() {
  return (
    <div className="grid grid-cols-1 h-screen w-screen">
      <div className="flex flex-col items-center mt-28 gap-6">
        <h1 className="text-2xl font-bold">Hi, Welcome Back! 👋</h1>
        <form action="#" className="flex flex-col gap-4 w-3/4">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="text"
              className="border p-2 rounded-lg"
              placeholder="enter you email"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="text"
              className="border p-2 rounded-lg"
              placeholder="enter you password"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <input type="checkbox" name="rememberme" id="rememberme" />
              <label>Remember Me</label>
            </div>
            <p className="text-red-500">Forgot Password?</p>
          </div>
          <button className="bg-blue-500 p-2 rounded-lg text-white">
            Login
          </button>
          <div className="flex flex-col items-center gap-2">
            <p>Or With</p>
            <hr />
          </div>
          <button className="flex items-center gap-8 border border-black p-2 rounded-lg">
            <img src="../../public/google.png" alt="logo" className="h-6" />
            Login with Google
          </button>
          <div className="flex justify-center">
            <p>
              Don't have an account ?{" "}
              <a href="#" className="text-blue-500">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
