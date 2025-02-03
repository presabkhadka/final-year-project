import React, { FC, useState } from "react";

interface RegisterFormInterface {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  contact: string;
  setContact: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterForm: FC<RegisterFormInterface> = ({
  showPassword,
  togglePasswordVisibility,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  contact,
  setContact,
  type,
  setType,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full max-w-md"
    >
      <div className="flex flex-col">
        <label htmlFor="username" className="mb-2 font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="border p-2 rounded-lg"
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="contact" className="mb-2 font-medium">
          Phone Number
        </label>
        <input
          type="text"
          id="contact"
          className="border p-2 rounded-lg"
          placeholder="Enter your phone number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
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
        <label htmlFor="password" className="mb-2 font-medium">
          Type
        </label>
        <input
          type="text"
          id="type"
          className="border p-2 rounded-lg pr-10"
          placeholder="Enter your account type"
          value={type}
          onChange={(e) => setType(e.target.value)}
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
};

const PromoterRegister: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1010/promoter/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
          contact,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.log(error);
    }
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
        <RegisterForm
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          handleSubmit={handleSubmit}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          name={name}
          setName={setName}
          contact={contact}
          setContact={setContact}
          type={type}
          setType={setType}
        />
      </div>
    </div>
  );
};

export default PromoterRegister;
