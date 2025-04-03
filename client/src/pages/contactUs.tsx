import Navbar from "@/components/navbar";
import { Mail, Phone } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="flex flex-col gap-2 bg-white h-screen w-screen dark:bg-muted/80">
      <div className="top-0 sticky z-50 bg-white dark:bg-black">
        <Navbar />
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 h-full gap-2">
        <div className="col-span-1 lg:col-span-1 flex justify-center items-center w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-4xl ">
              Get in <span className="text-green-400">touch</span>
            </h1>
            <p className="text-sm font-thin">
              Have questions or need assistance? Reach out to us--we're here to
              help!
            </p>
            <form action="">
              <div className="flex flex-col gap-4 p-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="bg-transparent border-b py-2 outline-none"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="bg-transparent border-b py-2 outline-none"
                />
                <input
                  type="text"
                  placeholder="Contact"
                  className="bg-transparent border-b py-2 outline-none"
                />
                <input
                  type="text"
                  placeholder="Message"
                  className="bg-transparent border-b py-2 outline-none"
                />
                <button className="bg-blue-500 text-white text-xs px-4 py-2 rounded-lg hover:bg-blue-400">
                  SUBMIT
                </button>
                <div className="flex gap-6">
                  <div className="flex gap-2">
                    <div className="self-center">
                      <Phone />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs font-bold">Phone</p>
                      <p className="text-xs font-thin text-red-500">
                        9843440345
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="self-center">
                      <Mail />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs font-bold">E-MAIL</p>
                      <p className="text-xs font-thin text-red-500">
                        presabkhadka30@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-1 flex items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58421799.407482915!2d15.583197799999978!3d26.655408499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6ea070e7b18b%3A0x2959e2a3e2bf54e0!2sItahari%20International%20College!5e0!3m2!1sen!2snp!4v1743564693290!5m2!1sen!2snp"
            width="90%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
