import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

interface DonationFormProps {
  donation?: any;
  onSubmit: (formData: FormData) => Promise<void>;
}

const DonationForm: React.FC<DonationFormProps> = ({ donation, onSubmit }) => {
  const [donationTitle, setDonationTitle] = useState(
    donation?.donationTitle || ""
  );
  const [donationDescription, setDonationDescription] = useState(
    donation?.donationDescription || ""
  );
  const [donationGoal, setDonationGoal] = useState(
    donation?.donationGoal || ""
  );
  const [donationQR, setDonationQR] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleQRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDonationQR(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("donationTitle", donationTitle);
    formData.append("donationDescription", donationDescription);
    formData.append("donationGoal", donationGoal);
    if (donationQR) {
      formData.append("donationQR", donationQR);
    }

    await onSubmit(formData);
    setLoading(false);
    navigate("/admin/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl p-6 rounded-lg flex flex-col gap-4 sm:grid sm:grid-cols-2"
    >
      <h1 className="text-2xl font-bold col-span-full text-center">
        {donation ? "Update Donation Campaign" : "Create New Donation Campaign"}
      </h1>

      <div className="flex flex-col gap-1 col-span-full">
        <label htmlFor="donationTitle" className="font-medium">
          Campaign Title
        </label>
        <Input
          type="text"
          value={donationTitle}
          onChange={(e) => setDonationTitle(e.target.value)}
          placeholder="Donation Campaign Title"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-1 col-span-full">
        <label htmlFor="donationDescription" className="font-medium">
          Campaign Description
        </label>
        <Textarea
          value={donationDescription}
          onChange={(e) => setDonationDescription(e.target.value)}
          placeholder="Describe your donation campaign"
          className="w-full p-2 border rounded-md resize-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1 col-span-full">
        <label htmlFor="donationGoal" className="font-medium">
          Donation Goal
        </label>
        <Input
          type="number"
          value={donationGoal}
          onChange={(e) => setDonationGoal(e.target.value)}
          placeholder="Donation Goal Amount"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-1 col-span-full">
        <label htmlFor="donationQR" className="font-medium">
          QR Code Image
        </label>
        <Input
          type="file"
          onChange={handleQRChange}
          className="w-full p-2 border rounded-md"
          required={!donation}
        />
        {donation?.donationQR && !donationQR && (
          <i className="text-xs text-gray-600">
            Current QR code already uploaded
          </i>
        )}
      </div>

      <div className="col-span-2 flex justify-center">
        <button
          type="submit"
          className="col-span-full w-fit px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition disabled:bg-gray-400"
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : donation
            ? "Update Donation Campaign"
            : "Create Donation Campaign"}
        </button>
      </div>
    </form>
  );
};

export default DonationForm;
