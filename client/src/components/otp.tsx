import axios from "axios";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function Otp() {
  const [otp, setOTP] = useState<string>("");

  const inputOTP = otp;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputOTP);
    try {
      const token = sessionStorage.getItem("Authorization");
      console.log(token);

      axios
        .post(
          "http://localhost:1010/promoter/verify-otp",
          { inputOTP },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log(response.data.message);
          window.location.href = "/promoter/dashboard";
        });
    } catch (error) {
      console.log(error);
    }
  };

  async function handleRegenerate() {
    try {
      const token = sessionStorage.getItem("Authorization");
      axios.get("http://localhost:1010/promoter/regenerate-otp", {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-semibold">
          Enter your <br /> security code
        </h1>
        <p>Please check your email for OTP</p>
      </div>
      <div className="space-y-2 flex justify-center">
        <InputOTP
          maxLength={4}
          value={inputOTP}
          onChange={(value) => setOTP(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex  flex-col items-center gap-4">
        <button
          onClick={handleSubmit}
          className="border px-6 py-3 rounded-3xl bg-blue-500 text-white font-semibold hover:bg-blue-400"
        >
          Submit
        </button>
        <div className="flex gap-2">
          <p className="text-slate-500">Didn't receive an OTP?</p>
          <button
            onClick={handleRegenerate}
            className="text-blue-500 font-bold"
          >
            Send Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Otp;
