import PromoterNavbar from "@/components/promoterNavbar";
import PromoterSidebar from "@/components/promoterSidebar";

export default function PromoterDashboard() {
  return (
    <div className="grid grid-cols-1 h-screen md:grid md:grid-cols-12 ">
      <div className="md:col-span-2 h-full">
        <PromoterSidebar />
      </div>
      <div className="md:col-span-10 ">
        
      </div>
    </div>
  );
}
