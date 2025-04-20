import { useEffect, useState } from "react";
import axios from "axios";
import { Target } from "lucide-react";
import PromoterNavbar from "@/components/promoterNavbar";

interface Campaign {
  _id: string;
  donationTitle: string;
  donationDescription: string;
  donationGoal: string;
  donationQR?: {
    data: Uint8Array;
  };
}

export default function PromoterDonationCampaign() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const token = localStorage.getItem("Authorization")?.split(" ")[1];
      const response = await axios.get(
        "http://localhost:1010/promoter/donation-campaigns",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCampaigns(response.data.relatedCampaigns);
    };

    fetchCampaigns();
    const interval = setInterval(fetchCampaigns, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-muted/80">
      <div className="bg-white shadow-sm dark:bg-black w-full top-0 sticky z-50">
        <PromoterNavbar />
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="bg-white dark:bg-muted/80 rounded-lg border shadow-md flex flex-col"
            >
              <div className="h-48 flex items-center justify-center">
                <img
                  src={`http://localhost:1010${campaign.donationQR}`}
                  alt={campaign.donationTitle}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-1">
                  {campaign.donationTitle}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-white line-clamp-3 flex-1">
                  {campaign.donationDescription}
                </p>

                <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-white">
                  <Target className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">
                    Goal: ${campaign.donationGoal}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
