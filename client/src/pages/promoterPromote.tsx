import PromoterNavbar from "@/components/promoterNavbar";
import TreasureForm from "./promoterCRUD";

export default function Promote() {
  return (
    <div className="grid grid-cols-12 gap-4 h-screen">
      <div className="col-span-full">
        <PromoterNavbar />
        <TreasureForm />
      </div>
    </div>
  );
}
