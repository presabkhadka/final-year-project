import PromoterNavbar from "@/components/promoterNavbar";
import TreasureForm from "./promoterCRUD";
import { Store, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Promote() {
  return (
    <div className="grid grid-cols-12 gap-4 h-screen">
      <div className="col-span-full">
        <div className="sticky top-0 z-50 bg-white shadow-md dark:bg-black">
          <PromoterNavbar />
        </div>
        <div className="min-h-screen ">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <Store className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-xl font-semibold ">
                Promote Treasures
              </h1>
            </div>
            <Dialog>
              <DialogTrigger className="border px-4 py-2 rounded-lg bg-blue-500 text-white">Open</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  {/* <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription> */}
                  <TreasureForm/>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          <main className="max-w-7xl mx-auto px-4 py-6">
            <div className="space-y-4">
              {/* Business Card A */}
              <div className="rounded-lg shadow overflow-hidden border">
                <div className="flex">
                  <div className="w-1/3">
                    <img
                      src="https://images.unsplash.com/photo-1546213290-e1b492ab3eee?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                      alt="Business A"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Business A
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      New Road Street 14, KTM, Nepal
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Opening Time: 10:00AM - 07:00PM
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Contact Detail: 9848758965
                    </p>
                    <div className="mt-4 flex justify-end">
                      <button className="text-blue-600 border border-blue-600 px-4 py-1 rounded-md text-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
