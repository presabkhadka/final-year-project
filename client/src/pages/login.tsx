import axios from "axios";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

interface loginFormInterface {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleGoogleLoginSuccess: (response: any) => void;

  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: FC<loginFormInterface> = ({
  showPassword,
  togglePasswordVisibility,
  handleSubmit,
  handleGoogleLoginSuccess,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md"
    >
      {/* Email Field */}
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border p-2 rounded-lg"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input type="checkbox" id="rememberme" className="scale-125" />
          <label htmlFor="rememberme" className="text-sm">
            Remember Me
          </label>
        </div>
        <a href="#" className="text-red-500 text-sm">
          Forgot Password?
        </a>
      </div>

      <button className="bg-blue-500 p-2 rounded-lg text-white font-semibold hover:bg-blue-600">
        Login
      </button>

      <div className="flex flex-col items-center gap-2 mt-4">
        <p className="text-gray-500">Or Login With</p>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => toast.error("Google login failed. Please try again.")}
          useOneTap
        />
      </div>

      <div className="text-center mt-4">
        <p>
          Don't have an account?{" "}
          <a href="/explorer/signup" className="text-blue-500 font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </form>
  );
};

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const res = await axios.post("http://localhost:1010/explorer/login", {
        tokenId: response.credential,
      });
      console.log(response.credential);

      const { token } = res.data;
      localStorage.setItem("Authorization", `Bearer ${token}`);
      localStorage.setItem("UserRole", "explorer");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success("Logged in successfully!");
      navigate("/home");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.msg || "Google login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:1010/explorer/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;
      const bearerToken = `Bearer ${token}`;

      localStorage.setItem("Authorization", bearerToken);
      axios.defaults.headers.common["Authorization"] = bearerToken;
      toast.success("Logged in successfully!");
      navigate("/home");
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen w-screen">
      <div className="hidden md:block md:col-span-7">
        <img
          src="/patan.jpeg"
          alt="bhaktapur"
          className="h-full w-full object-cover rounded-r-3xl"
        />
      </div>

      <div className="col-span-1 md:col-span-5 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-6">Hi, Welcome Back! 👋</h1>
        <LoginForm
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          handleSubmit={handleSubmit}
          handleGoogleLoginSuccess={handleGoogleLoginSuccess}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      </div>
    </div>
  );
};

export default Login;
