import PromoterNavbar from "@/components/promoterNavbar";
import { StatsRing } from "@/components/ui/stats-ring";

export default function PromoterDashboard() {
  return (
    <div className="grid grid-cols-1 h-screen md:grid md:grid-cols-12 md: gap-x-4">
      <div className="col-span-full ">
        <PromoterNavbar />
        <StatsRing />
      </div>
    </div>
  );
}
