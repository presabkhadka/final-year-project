import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

interface TreasureFormProps {
  treasure?: any;
  onSubmit: (formData: FormData) => Promise<void>;
}

const TreasureForm: React.FC<TreasureFormProps> = ({ treasure, onSubmit }) => {
  const [treasureName, setTreasureName] = useState(
    treasure?.treasureName || ""
  );
  const [treasureLocation, setTreasureLocation] = useState(
    treasure?.treasureLocation || ""
  );
  const [treasureDescription, setTreasureDescription] = useState(
    treasure?.treasureDescription || ""
  );
  const [treasureContact, setTreasureContact] = useState(
    treasure?.treasureContact || ""
  );
  const [treasureType, setTreasureType] = useState(
    treasure?.treasureType || ""
  );
  const [openingTime, setOpeningTime] = useState(
    treasure?.treasureOpeningTime || ""
  );
  const [closingTime, setClosingTime] = useState(
    treasure?.treasureClosingTime || ""
  );
  const [latitude, setLatitude] = useState(treasure?.latitude || "");
  const [longitude, setLongitude] = useState(treasure?.longitude || "");
  const [treasureImage, setTreasureImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTreasureImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("treasureName", treasureName);
    formData.append("treasureLocation", treasureLocation);
    formData.append("treasureDescription", treasureDescription);
    formData.append("treasureContact", treasureContact);
    formData.append("treasureType", treasureType);
    formData.append("treasureOpeningTime", openingTime);
    formData.append("treasureClosingTime", closingTime);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    if (treasureImage) {
      formData.append("treasureImage", treasureImage);
    }

    await onSubmit(formData);
    setLoading(false);
    navigate("/promoter/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6  rounded-lg flex flex-col gap-4 sm:grid sm:grid-cols-2"
    >
      <h1 className="text-2xl font-bold col-span-full text-center">
        {treasure ? "Update Treasure" : "Add New Treasure"}
      </h1>

      <div className="flex flex-col gap-1">
        <label htmlFor="treasureName" className="font-medium">
          Treasure Name
        </label>
        <Input
          type="text"
          value={treasureName}
          onChange={(e) => setTreasureName(e.target.value)}
          placeholder="Treasure Name"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="treasureLocation" className="font-medium">
          Treasure Location
        </label>
        <Input
          type="text"
          value={treasureLocation}
          onChange={(e) => setTreasureLocation(e.target.value)}
          placeholder="Location"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="treasureType" className="font-medium">
          Treasure Type
        </label>
        <Input
          type="text"
          value={treasureType}
          onChange={(e) => setTreasureType(e.target.value)}
          placeholder="Type"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="treasureContact" className="font-medium">
          Treasure Contact
        </label>
        <Input
          type="text"
          value={treasureContact}
          onChange={(e) => setTreasureContact(e.target.value)}
          placeholder="Contact"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="openingTime" className="font-medium">
          Opening Time
        </label>
        <Input
          type="time"
          value={openingTime}
          onChange={(e) => setOpeningTime(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="closingTime" className="font-medium">
          Closing Time
        </label>
        <Input
          type="time"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="latitude" className="font-medium">
          Treasure Latitude
        </label>
        <Textarea
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="latitude"
          className="w-full p-2 border rounded-md resize-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="longitude" className="font-medium">
          Treasure Longitude
        </label>
        <Textarea
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="longitude"
          className="w-full p-2 border rounded-md resize-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1 col-span-full">
        <label htmlFor="treasureDescription" className="font-medium">
          Treasure Description
        </label>
        <Textarea
          value={treasureDescription}
          onChange={(e) => setTreasureDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded-md resize-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="treasureImage" className="font-medium">
          Treasure Image
        </label>
        <Input
          type="file"
          onChange={handleImageChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="col-span-2 flex justify-center">
        <button
          type="submit"
          className="col-span-full w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition disabled:bg-gray-400"
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : treasure
            ? "Update Treasure"
            : "Add Treasure"}
        </button>
      </div>
    </form>
  );
};

export default TreasureForm;
