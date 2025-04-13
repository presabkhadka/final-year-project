import { Mail, Phone } from "lucide-react";
import Navbar from "@/components/navbar";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function ContactUs() {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast
      .promise(
        emailjs.sendForm(
          "service_4meniuo",
          "template_ate8b9q",
          form.current!,
          "2GLJcMdf2A48ixLo_"
        ),
        {
          loading: "Sending message...",
          success: "Message sent successfully ✅",
          error: "Failed to send message ❌",
        }
      )
      .then(() => {
        form.current?.reset();
      });
  };

  return (
    <div className="flex flex-col gap-2 bg-white h-screen w-screen dark:bg-muted/80">
      <div className="top-0 sticky z-50 bg-white dark:bg-black">
        <Navbar />
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 h-full gap-2">
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col gap-2 w-full">
            <h1 className="font-semibold text-4xl">
              Get in <span className="text-green-400">touch</span>
            </h1>
            <p className="text-sm font-thin">
              Have questions or need assistance? Reach out to us—we're here to
              help!
            </p>
            <form ref={form} onSubmit={sendEmail}>
              <div className="flex flex-col gap-4 p-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="bg-transparent border-b py-2 outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="bg-transparent border-b py-2 outline-none"
                />
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact"
                  required
                  className="bg-transparent border-b py-2 outline-none"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  required
                  className="bg-transparent border-b py-2 outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white text-xs px-4 py-2 rounded-lg hover:bg-blue-400"
                >
                  SUBMIT
                </button>
                <div className="flex gap-6">
                  <div className="flex gap-2">
                    <Phone className="self-center" />
                    <div className="flex flex-col">
                      <p className="text-xs font-bold">Phone</p>
                      <p className="text-xs font-thin text-red-500">
                        9843440345
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Mail className="self-center" />
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
        <div className="flex items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=..."
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
