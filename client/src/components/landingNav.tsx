import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

export default function LandingNav() {
  const navigate = useNavigate();

  return (
    <div className="py-4 px-4 md:px-6 shadow-md rounded-lg flex justify-between items-center dark:border">
      <div>
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-500 to-orange-500 bg-clip-text text-transparent hover:cursor-pointer"
        >
          Urban Discoveries
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <button
          onClick={() => {
            navigate("/explorer/signup");
          }}
          className="border bg-orange-400 text-white p-2 md:px-4 md:py-2 rounded-lg hover:bg-orange-600"
        >
          Explorer
        </button>
        <button
          onClick={() => {
            navigate("/promoter/signup");
          }}
          className="border  bg-green-500 text-white p-2 md:px-4 md:py-2 rounded-lg hover:bg-green-600"
        >
          Promoter
        </button>
      </div>
    </div>
  );
}
