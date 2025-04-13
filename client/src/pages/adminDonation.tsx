import AdminNavbar from "@/components/AdminNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { CircleDollarSign } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import DonationForm from "@/components/donationForm";

interface Donation {
  _id: string;
  donationTitle: string;
  donationDescription: string;
  donationGoal: string;
  donationQR: string;
}

export default function AdminDontaion() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let fetchDonations = async () => {
      try {
        let token = localStorage.getItem("Authorization")?.split(" ")[1];
        if (!token) {
          throw new Error("no token found");
        }
        let response = await axios.get(
          "http://localhost:1010/admin/active-donation-campaigns",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDonations(response.data.activeCampaigns);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
    let interval = setInterval(fetchDonations, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateDonation = async (formData: FormData) => {
    try {
      const token = localStorage.getItem("Authorization")?.split(" ")[1];
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        "http://localhost:1010/admin/add-donation-campaign",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Donation added successfully");
        setIsDialogOpen(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while submitting the form.");
    }
  };

  const handleUpdateDonation = async (formData: FormData) => {
    if (!selectedDonation) {
      console.error("No donation selected for update.");
      return;
    }

    console.log("Updating treasure with ID:", selectedDonation._id);

    try {
      let token = localStorage.getItem("Authorization")?.split(" ")[1];
      if (!token) {
        throw new Error("token not found");
      }

      if (!formData.get("donationQR")) {
        formData.delete("donationQR");
      }

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.patch(
        `http://localhost:1010/admin/update-donation-campaign/${selectedDonation._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update Success:", response.data);
      setIsDialogOpen(false);
      toast.success("Campaign updated successfully!");
    } catch (error) {
      console.error("Update failed");
      toast.error("Something went wrong while updating.");
    }
  };

  const handleDeleteDonation = async (donation: any) => {
    if (!donation) {
      console.log("no donation campaign to delete");
      return;
    }
    try {
      let token = localStorage.getItem("Authorization")?.split(" ")[1];
      if (!token) {
        throw new Error("token not found in headers");
      }
      const response = await axios.delete(
        `http://localhost:1010/admin/delete-donation-campaign/${donation._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Donation campaign deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50 overflow-y-hidden shadow-md">
        <AdminNavbar />
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center  border shadow-md rounded-xl hover:border-blue-500">
          <div className="flex items-center space-x-3">
            <CircleDollarSign className="h-7 w-7 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Donation Campaigns
            </h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger
              onClick={() => {
                setSelectedDonation(null);
              }}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Add Campaign
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DonationForm
                  donation={selectedDonation}
                  onSubmit={
                    selectedDonation
                      ? handleUpdateDonation
                      : handleCreateDonation
                  }
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-4 overflow-auto">
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="rounded-lg shadow overflow-hidden border"
                    >
                      <div className="flex">
                        <div className="w-1/3">
                          <Skeleton height="100%" width="100%" />
                        </div>
                        <div className="w-2/3 p-4">
                          <Skeleton count={2} />
                          <Skeleton width="80%" />
                          <Skeleton width="60%" />
                          <Skeleton width="30%" />
                        </div>
                      </div>
                    </div>
                  ))
              : donations?.map((donation: Donation) => (
                  <div
                    key={donation._id}
                    className="rounded-lg overflow-hidden border shadow-md hover:border-blue-500"
                  >
                    <div className="flex">
                      <div className="w-1/3">
                        {donation.donationQR ? (
                          <img
                            src={`http://localhost:1010${donation.donationQR}`}
                            alt={donation.donationTitle}
                            className="h-full aspect-video"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="w-2/3 p-4 flex flex-col justify-between">
                        <div className="flex flex-col gap-4">
                          <h2 className="text-lg font-medium">
                            {donation.donationTitle}
                          </h2>
                          <div>
                            <h3 className="text-base1 font-medium">
                              Donation Description:
                            </h3>
                            <p className="text-sm  text-slate-500 dark:text-slate-300">
                              {donation.donationDescription}
                            </p>
                          </div>
                          <p className="text-sm  text-slate-500 dark:text-slate-300">
                            Donation Goal: {donation.donationGoal}
                          </p>
                        </div>
                        <div className=" flex justify-end gap-2 mt-2">
                          <button
                            onClick={() => {
                              setSelectedDonation(donation);
                              setIsDialogOpen(true);
                            }}
                            className="text-blue-600 border border-blue-600 hover:bg-blue-500 hover:text-white px-4 py-1 rounded-md text-sm transition-colors duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              handleDeleteDonation(donation);
                            }}
                            className="text-red-600 border border-red-600 hover:bg-red-500 hover:text-white px-4 py-1 rounded-md text-sm transition-colors duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </main>
      </div>
    </div>
  );
}
