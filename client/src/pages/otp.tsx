function Otp() {
  return (
    <>
      <div className="grid grid-cols-1 h-screen w-screen md:hidden">
        <div className="flex flex-col items-center mt-16 gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Enter your OTP code</h1>
            <p>here we add otp</p>
          </div>
        </div>
      </div>
      <div className="hidden md:grid md:grid-cols-12 md:h-screen md:w-screen "></div>
    </>
  );
}
export default Otp;
