import axios from "axios";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";

function Otp() {
  const [inputOTP, setInputOTP] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputOTP.trim() || inputOTP.length !== 4) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("Authorization");

      const response = await axios.post(
        "http://localhost:1010/promoter/verify-otp",
        { inputOTP },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        toast({
          title: "Invalid OTP",
          description: "Promoter verified successfully",
        });
        navigate("/promoter/dashboard");
      } else {
        console.log("Invalid OTP. Please try again.");
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error?.response?.data || error);
    }
  };

  async function handleRegenerate() {
    try {
      const token = localStorage.getItem("Authorization");
      const response = await axios.get(
        "http://localhost:1010/promoter/regenerate-otp",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log("OTP regenerated successfully");
      } else {
        console.log("Failed to regenerate OTP");
      }
    } catch (error: any) {
      console.error("Error regenerating OTP:", error?.response?.data || error);
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
      <form
        onSubmit={handleSubmit}
        className="space-y-2 flex flex-col items-center"
      >
        <InputOTP maxLength={4} value={inputOTP} onChange={setInputOTP}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>

        <button
          type="submit"
          className="border px-6 py-3 rounded-3xl bg-blue-500 text-white font-semibold hover:bg-blue-400"
        >
          Submit
        </button>

        <div className="flex gap-2">
          <p className="text-slate-500">Didn't receive an OTP?</p>
          <button
            type="button"
            onClick={handleRegenerate}
            className="text-blue-500 font-bold"
          >
            Send Again
          </button>
        </div>
      </form>
    </div>
  );
}

export default Otp;
