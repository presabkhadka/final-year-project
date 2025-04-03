import { useEffect, useState } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import {useNavigate} from 'react-router-dom'

function PaymentSuccess() {
  const [showContent, setShowContent] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
      <div
        className={`max-w-md w-full bg-white rounded-2xl shadow-xl transform transition-all duration-500 ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Success Icon */}
        <div className="flex justify-center -mt-12">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </div>

        <div className="px-8 py-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. We've sent a confirmation email to your
            inbox.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-semibold text-gray-800">$149.99</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-mono text-sm text-gray-800">
                TXN123456789
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="text-gray-800">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            
            <button className="w-full bg-white text-gray-600 py-3 px-6 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 hover:border-green-500 transition-colors flex items-center justify-center gap-2" onClick={()=>{
                navigate("/explorer/donation-campaigns")
            }}>
              <ArrowLeft className="w-5 h-5" />
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
