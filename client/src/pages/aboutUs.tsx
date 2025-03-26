import LandingNav from "@/components/landingNav";
import { MapPin, Heart, Compass, ChevronDown } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <div className="top-0 z-50 sticky overflow-hidden bg-white shadow-md dark:bg-black">
        <LandingNav />
      </div>
      <div
        className="h-screen relative bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://www.chandragirihills.com/wp-content/themes/yootheme/cache/e5/Kathmandu-Durbar-Square-e5389554.jpeg")',
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

      <div className="py-20 bg-gray-50 dark:bg-muted/80">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-green-400 dark:text-lime-400">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed dark:text-white">
              We believe every city has hidden stories waiting to be discovered.
              Our platform connects curious travelers with local gems that often
              go unnoticed, creating authentic experiences that go beyond
              typical tourist attractions.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 bg-blue-500">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-blue-100 rounded-full">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Local Expertise</h3>
              <p className="text-white">
                Curated recommendations from residents who know their cities
                inside and out.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-green-100 rounded-full">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Authentic Experiences
              </h3>
              <p className="text-white">
                Focus on genuine, off-the-beaten-path locations and experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-purple-100 rounded-full">
                <Compass className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Adventure Guide</h3>
              <p className="text-white">
                Detailed guides and tips to help you explore with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-50 dark:bg-muted/80">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-500 text-orange-400">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <img
                src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/573d05fc007e96fa53278978edb456f1-1735369992195/7401a94e-e22f-44e1-bf40-d35f14fd8344.jpg"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">Presab Khadka</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="text-center">
              <img
                src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/573d05fc007e96fa53278978edb456f1-1735369992195/7401a94e-e22f-44e1-bf40-d35f14fd8344.jpg"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">Presab Khadka</h3>
              <p>Head of Curation</p>
            </div>
            <div className="text-center">
              <img
                src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/573d05fc007e96fa53278978edb456f1-1735369992195/7401a94e-e22f-44e1-bf40-d35f14fd8344.jpg"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">Presab Khadka</h3>
              <p>Technical Assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Connect With Us
          </h2>
          <div className="flex justify-center space-x-6 "></div>
          <p className="mt-8 text-white">
            Questions? Reach out to us at {""}
            <a
              href="mailto:presabkhadka30@gmail.com"
              className="text-yellow-500 hover:underline"
            >
              presabkhadka30@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
