export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12">
      {/* Loading Spinner */}
      <div className="relative">
        <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      
      {/* Loading Text */}
      <p className="mt-4 text-gray-600 text-sm sm:text-base font-medium">
        Loading people...
      </p>
    </div>
  );
}
