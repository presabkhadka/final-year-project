import PromoterNavbar from "@/components/promoterNavbar";

export default function PromoterDashboard() {
  return (
    <div className="grid grid-cols-1 h-screen md:grid md:grid-cols-12 md: gap-x-4">
      <div className="col-span-full ">
        <PromoterNavbar />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl shadow-xl bg-muted/50 flex justify-center items-center">
              <h1>total treasure</h1>
            </div>
            <div className="aspect-video rounded-xl shadow-xl bg-muted/50 flex justify-center items-center">
              <h1>positive response</h1>
            </div>
            <div className="aspect-video rounded-xl shadow-xl bg-muted/50 flex justify-center items-center">
              <h1>negative response</h1>
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </div>
    </div>
  );
}
