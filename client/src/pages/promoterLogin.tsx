import { Input } from "@/components/ui/input";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface LoginFormProps {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleGoogleLoginSuccess: (response: any) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: FC<LoginFormProps> = ({
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
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 font-medium">
          Email
        </label>
        <Input
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
        <Input
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
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "🙈" : "👁"}
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

      <button
        type="submit"
        className="bg-blue-500 p-2 rounded-lg text-white font-semibold hover:bg-blue-600"
      >
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
          <a href="/promoter/signup" className="text-blue-500 font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </form>
  );
};

const PromoterLogin: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1010/promoter/login",
        { email, password }
      );
      const { token, verificationStatus } = response.data;
      localStorage.setItem("Authorization", `Bearer ${token}`);
      localStorage.setItem("UserRole", "promoter");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success("Logged in successfully!");
      navigate(verificationStatus ? "/promoter/dashboard" : "/promoter/verify");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.msg || "Invalid credentials. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const res = await axios.post("http://localhost:1010/promoter/login", {
        tokenId: response.credential,
      });
      console.log(response.credential);

      const { token, verificationStatus } = res.data;
      localStorage.setItem("Authorization", `Bearer ${token}`);
      localStorage.setItem("UserRole", "promoter");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success("Logged in successfully!");
      navigate(verificationStatus ? "/promoter/dashboard" : "/promoter/verify");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.msg || "Google login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen w-screen">
      <div className="hidden md:block md:col-span-7">
        <img
          src="/bhaktapur.jpg"
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

export default PromoterLogin;
