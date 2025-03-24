import LandingNav from "@/components/landingNav";
import { Camera, Star, Coffee, Navigation, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const becomePromoter = () => {
    navigate("/promoter/signup");
  };

  const becomeExplorer = () => {
    navigate("/explorer/signup");
  };

  return (
    <div className="min-h-screen ">
      <div className="top-0 z-50 sticky overflow-hidden bg-white shadow-md dark:bg-black">
        <LandingNav />
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

              <div className="mt-8 flex">
                <button
                  onClick={() => {
                    navigate("/about-us");
                  }}
                  className="bg-green-500 text-white p-4 rounded-r-full hover:bg-green-700 font-bold"
                >
                  About Us
                </button>
              </div>
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

      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to explore more?
          </h2>
          <p className="text-blue-100 mb-8">
            Seek for more underrated places and help others discover the city's
            secrets too.
          </p>
          <button
            onClick={becomeExplorer}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 animate-bounce"
          >
            Click here to be an explorer!
          </button>
        </div>
      </div>

      <div className="py-20 bg-muted/80">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Hidden Gems
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Secret Garden Cafe",
                image:
                  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                rating: 4.8,
                category: "Cafe",
              },
              {
                title: "Vintage Bookstore",
                image:
                  "https://images.unsplash.com/photo-1521123845560-14093637aa7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                rating: 4.6,
                category: "Shopping",
              },
              {
                title: "Rooftop View Point",
                image:
                  "https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                rating: 4.9,
                category: "Sightseeing",
              },
            ].map((place, index) => (
              <div
                key={index}
                className="bg-muted/80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{place.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1  font-bold text-sm">
                        Highly Visited
                      </span>
                    </div>
                  </div>
                  <p className="mt-2">{place.category}</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Know a Hidden Gem?
          </h2>
          <p className="text-blue-100 mb-8">
            Share your favorite underrated places and help others discover the
            city's secrets.
          </p>
          <button
            onClick={becomePromoter}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 animate-bounce"
          >
            Click here to be a promoter!
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
