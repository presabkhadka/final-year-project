import AdminNavbar from "@/components/AdminNavbar";

export default function AdminDontaion() {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50 overflow-y-hidden">
        <AdminNavbar />
      </div>
      <div className="flex-1 overflow-auto p-4">hi there</div>
    </div>
  );
}
