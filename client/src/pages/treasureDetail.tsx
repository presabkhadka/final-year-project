import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/navbar";
import {
  MessageCircle,
  ThumbsUp,
  Share2,
  Clock,
  MapPin,
  Phone,
  Tag,
} from "lucide-react";

interface Treasure {
  _id: string;
  treasureName: string;
  treasureLocation: string;
  treasureType: string;
  openingTime: string;
  closingTime: string;
  owner: string;
  visitors: number;
  treasureContact: string;
  treasureDescription: string;
  treasureImage?: string;
}

interface Review {
  _id: string;
  reviewType: "good" | "bad";
  reviewComments: string;
  author: {
    _id: string;
    userName: string;
  };
  reviewOf: string;
  createdAt?: string;
}

type ReviewType = "good" | "bad";

export default function TreasureDetail() {
  const { id } = useParams();
  const [treasure, setTreasure] = useState<Treasure | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [reviewType, setReviewType] = useState<ReviewType>("good");

  useEffect(() => {
    const fetchTreasure = async () => {
      const token = localStorage.getItem("Authorization")?.split(" ")[1];
      try {
        const res = await axios.get(
          `http://localhost:1010/explorer/treasure/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTreasure(res.data.treasure);
      } catch (err) {
        console.error("Error fetching treasure", err);
        toast.error("Failed to load treasure details");
      }
    };
    if (id) fetchTreasure();
    const interval = setInterval(fetchTreasure, 10000);
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("Authorization")?.split(" ")[1];
        if (!token) {
          throw new Error("No authorization headers");
        }
        const response = await axios.get(
          `http://localhost:1010/explorer/treasure-reviews/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews", error);
        toast.error("Failed to load reviews");
      }
    };
    if (id) fetchReviews();
    const interval = setInterval(fetchReviews, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newReview.trim()) {
      toast.error("Please write a review before submitting");
      return;
    }

    const token = localStorage.getItem("Authorization")?.split(" ")[1];

    const loadingToast = toast.loading("Posting your review...");

    try {
      await axios.post(
        `http://localhost:1010/explorer/add-review/${id}`,
        {
          reviewComments: newReview,
          reviewType: reviewType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review posted successfully!", { id: loadingToast });

      setNewReview("");
      setReviewType("good");

      // Refresh reviews
      const response = await axios.get(
        `http://localhost:1010/explorer/treasure-reviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error posting review", error);
      toast.error("Failed to post review", { id: loadingToast });
    }
  };

  if (!treasure)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-muted/80">
      <div className="dark:bg-black sticky top-0 z-50 bg-white">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-muted/80 rounded-xl shadow-lg">
          {/* Hero Image */}
          <div className="relative h-96">
            <img
              src={`http://localhost:1010${treasure.treasureImage}`}
              alt={treasure.treasureName}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h1 className="text-4xl font-bold text-white mb-2">
                {treasure.treasureName}
              </h1>
              <div className="flex items-center text-white/80 gap-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{treasure.treasureLocation}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {treasure.openingTime} - {treasure.closingTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 border-b dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 dark:text-white">
                  About
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {treasure.treasureDescription}
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Tag className="w-5 h-5" />
                  <span>Type: {treasure.treasureType}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Phone className="w-5 h-5" />
                  <span>Contact: {treasure.treasureContact}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MessageCircle className="w-5 h-5" />
                  <span>{reviews.length} Reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 dark:text-white">
              Reviews
            </h2>

            {/* Review Form */}
            <form onSubmit={handleSubmitReview} className="mb-8 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write a review..."
                    className="w-full rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={reviewType}
                  onChange={(e) => setReviewType(e.target.value as ReviewType)}
                  className="rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="good">Good</option>
                  <option value="bad">Bad</option>
                </select>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Post
                </button>
              </div>
            </form>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        {review.author.userName[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium dark:text-white">
                          {review.author.userName}
                        </h3>
                        <span
                          className={`text-sm px-2 py-0.5 rounded ${
                            review.reviewType === "good"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {review.reviewType}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(
                          review.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {review.reviewComments}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
