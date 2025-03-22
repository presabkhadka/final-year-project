import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-dark">
      <h1>hi</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          console.log(jwtDecode(credentialResponse.credential || "hi"));
          navigate("/promoter/login")
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}
