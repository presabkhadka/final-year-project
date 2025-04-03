import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import {
  Camera,
  Star,
  Coffee,
  Navigation,
  ChevronDown,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Landing() {
  const navigate = useNavigate();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

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
    treasureImage?: {
      data: Uint8Array;
    };
  }

  const [treasures, setTreasures] = useState<Treasure[]>([]);

  useEffect(() => {
    const fetchTreasures = async () => {
      let token = localStorage.getItem("Authorization")?.split(" ")[1];
      let response = await axios.get(
        "http://localhost:1010/explorer/fetch-treasures",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTreasures(response.data.treasures);
    };
    fetchTreasures();
    let interval = setInterval(fetchTreasures, 5000);
    return () => clearInterval(interval);
  }, []);

  const [currentTreasureIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Blogger",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote:
        "Thanks to Urban Discoveries, I found the most amazing hidden cafes and restaurants that became the highlights of my food blog. The local insights are invaluable!",
    },
    {
      name: "Michael Chen",
      role: "Photography Enthusiast",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote:
        "I've discovered incredible photo spots that I never knew existed in my own city. The community here is so helpful and passionate about sharing hidden gems.",
    },
    {
      name: "Emma Rodriguez",
      role: "Adventure Seeker",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote:
        "Urban Discoveries opened my eyes to amazing secret spots right in my neighborhood. Every weekend now feels like a new adventure!",
    },
    {
      name: "David Thompson",
      role: "Local Guide",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote:
        "Being able to share my favorite hidden spots with others has been incredibly rewarding. The platform makes it easy to connect with genuine explorers.",
    },
    {
      name: "Lisa Zhang",
      role: "Art Enthusiast",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote:
        "I've found so many amazing street art locations and underground galleries. This platform is a game-changer for anyone interested in the local art scene.",
    },
    {
      name: "James Wilson",
      role: "History Buff",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      quote:
        "The historical landmarks and hidden architectural gems I've discovered through Urban Discoveries have added a whole new dimension to my city exploration.",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === testimonials.length - 3 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 3 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="top-0 z-50 sticky overflow-hidden bg-white shadow-md dark:bg-black">
        <Navbar />
      </div>
      <div
        className="h-screen relative bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto px-6">
            <div className="mt-32 max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Discover Your City's Best Kept Secrets
              </h1>
              <p className="mt-6 text-xl text-gray-200">
                Explore unique, underrated places that make our city special.
                From hidden cafes to secret gardens, find the spots locals love.
              </p>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center">
              <p className="text-sm mb-2">Scroll to discover more</p>
              <ChevronDown className="h-6 w-6 mx-auto animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-muted/80">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <Camera className="h-12 w-12 mx-auto text-blue-600" />
              <h3 className="mt-4 text-xl font-semibold">Photogenic Spots</h3>
              <p className="mt-2">
                Discover Instagram-worthy locations that few tourists know
                about.
              </p>
            </div>
            <div className="text-center">
              <Coffee className="h-12 w-12 mx-auto text-blue-600" />
              <h3 className="mt-4 text-xl font-semibold">Local Favorites</h3>
              <p className="mt-2">
                Experience authentic local culture at neighborhood gems.
              </p>
            </div>
            <div className="text-center">
              <Navigation className="h-12 w-12 mx-auto text-blue-600" />
              <h3 className="mt-4 text-xl font-semibold">Guided Tours</h3>
              <p className="mt-2">
                Join local experts for unique perspectives on hidden spots.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-blue-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Support meaningful causes around you
          </h2>
          <p className="mb-8">
            Discover impactful donation campaigns and help make a difference in
            your community.
          </p>
          <button
            onClick={() => {
              navigate("/explorer/donation-campaigns");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-400"
          >
            See Campaigns
          </button>
        </div>
      </div>

      <div className="bg-muted/80 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What our happy clients say?
          </h2>
          <div className="relative">
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-50 dark:bg-muted/100 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-50 dark:bg-muted/100 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentTestimonialIndex * 33.333
                  }%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full md:w-1/3 flex-shrink-0 px-4"
                  >
                    <div className="bg-white dark:bg-muted/80 rounded-lg p-6 shadow-lg h-full">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-white">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <Quote className="h-8 w-8 text-blue-600 mb-2 " />
                      <p className="text-gray-700 italic dark:text-white">
                        {testimonial.quote}
                      </p>
                      <div className="mt-4 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-8">
              {[...Array(testimonials.length - 2)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`mx-1 w-2 h-2 rounded-full transition-colors ${
                    currentTestimonialIndex === index
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-muted/80">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore more treasures
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {treasures
              .slice(currentTreasureIndex, currentTreasureIndex + 3)
              .map((place, index) => (
                <div
                  key={index}
                  className="bg-muted/80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={`http://localhost:1010${place.treasureImage}`}
                    alt={place.treasureName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">
                      {place.treasureName}
                    </h3>
                    <p className="mt-2 inline-block bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full dark:bg-orange-500 dark:text-white">
                      {place.treasureType}
                    </p>
                    <button
                      onClick={() => {
                        navigate("/explorer/explore");
                      }}
                      className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                      Know More
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-blue-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Discover hidden gems around you
          </h2>
          <p className="mb-8">
            Discover underrated places and help others discover the city's
            secrets.
          </p>
          <button
            onClick={() => {
              navigate("/explorer/explore");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-400"
          >
            Explore
          </button>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">Urban Discoveries</span>
              </div>
              <p className="mt-4 max-w-xs">
                Discovering and sharing the most unique and underrated places in
                your city.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2025 Urban Discoveries. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
