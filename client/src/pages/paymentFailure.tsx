import { XCircle, RefreshCcw, ArrowLeft, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PaymentFailure() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <XCircle className="h-16 w-16 text-red-500" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            We weren't able to process your payment. Please try again or use a
            different payment method.
          </p>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">
            Error: Your card was declined. Please check your card details or
            contact your bank for more information.
          </p>
        </div>

        <div className="space-y-3">
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            onClick={() => window.location.reload()}
          >
            <RefreshCcw className="h-5 w-5" />
            Try Again
          </button>

          <div className="flex gap-3">
            <button
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 flex items-center justify-center gap-2 transition-colors"
              onClick={() => {
                navigate("/explorer/donation-campaigns");
              }}
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </button>

            <button
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 flex items-center justify-center gap-2 transition-colors"
              onClick={() => {
                navigate("/explorer/contact");
              }}
            >
              <HelpCircle className="h-5 w-5" />
              Get Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailure;
