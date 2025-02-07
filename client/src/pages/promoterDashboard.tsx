import PromoterNavbar from "@/components/promoterNavbar";

export default function PromoterDashboard() {
  return (
    <div className="grid grid-cols-1 h-screen md:grid md:grid-cols-12 md: gap-x-4">
      <div className="col-span-full ">
        <PromoterNavbar />
        <div className="p-6 flex justify-center items-center">
          <h1>hi there</h1>
        </div>
      </div>
    </div>
  );
}
