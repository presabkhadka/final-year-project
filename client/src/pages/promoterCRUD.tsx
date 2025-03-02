import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"


interface TreasureFormProps {
  treasure?: any; // Optional prop for updating an existing treasure
}

const TreasureForm: React.FC<TreasureFormProps> = ({ treasure }) => {
  const [treasureName, setTreasureName] = useState<string>(
    treasure?.treasureName || ""
  );
  const [treasureLocation, setTreasureLocation] = useState<string>(
    treasure?.treasureLocation || ""
  );
  const [treasureDescription, setTreasureDescription] = useState<string>(
    treasure?.treasureDescription || ""
  );
  const [treasureType, setTreasureType] = useState<string>(
    treasure?.treasureType || ""
  );
  const [treasureImage, setTreasureImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTreasureImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("treasureName", treasureName);
    formData.append("treasureLocation", treasureLocation);
    formData.append("treasureDescription", treasureDescription);
    formData.append("treasureType", treasureType);
    if (treasureImage) {
      formData.append("treasureImage", treasureImage);
    }

    try {
      const token = localStorage.getItem("Authorization")?.split(" ")[1];
      const url = treasure
        ? `http://localhost:1010/promoter/update-treasure/${treasure._id}`
        : "http://localhost:1010/promoter/add-treasure";
      const method = treasure ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.msg);
        navigate("/promoter/dashboard");
      } else {
        setError(data.msg || "Something went wrong.");
      }
    } catch (error) {
      setError("Something went wrong while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {treasure ? "Update Treasure" : "Add New Treasure"}
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="treasureName" className="block">
            Treasure Name
          </label>

          <Input
            type="text"
            id="treasureName"
            value={treasureName}
            onChange={(e) => setTreasureName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="treasureLocation" className="block">
            Treasure Location
          </label>
          <Input
            type="text"
            id="treasureLocation"
            value={treasureLocation}
            onChange={(e) => setTreasureLocation(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="treasureDescription" className="block">
            Treasure Description
          </label>
          <Textarea
            id="treasureDescription"
            value={treasureDescription}
            onChange={(e) => setTreasureDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="treasureType" className="block">
            Treasure Type
          </label>
          <Input
            type="text"
            id="treasureType"
            value={treasureType}
            onChange={(e) => setTreasureType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="treasureImage" className="block">
            Treasure Image
          </label>
          <Input
            type="file"
            id="treasureImage"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
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
    </div>
  );
};

export default TreasureForm;
