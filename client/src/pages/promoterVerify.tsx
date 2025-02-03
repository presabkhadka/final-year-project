import Otp from "../components/otp";

function promoterVerify() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-12 h-screen w-screen">
        <div className="hidden md:block md:col-span-7">
          <img
            src="/bhaktapur.jpg"
            alt="bhaktapur"
            className="h-full w-full object-cover rounded-r-3xl"
          />
        </div>

        <div className="col-span-1 md:col-span-5 flex flex-col items-center justify-center p-6">
          <Otp />
        </div>
      </div>
    </div>
  );
}

export default promoterVerify;
