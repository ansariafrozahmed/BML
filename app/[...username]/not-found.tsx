export default function ProfileNotFound() {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-orange-50 overflow-hidden">
        {/* Top Mandala */}
        <div className="absolute top-0 left-0 w-40 h-40 opacity-10">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="w-full h-full text-orange-500"
          >
            <circle cx="50" cy="50" r="48" />
            <circle cx="50" cy="50" r="40" />
            <path d="M50 2 L60 20 H40 Z" />
            <path d="M50 98 L60 80 H40 Z" />
            <path d="M2 50 L20 60 V40 Z" />
            <path d="M98 50 L80 60 V40 Z" />
            <path d="M25 25 L50 50 L25 75 Z" />
            <path d="M75 25 L50 50 L75 75 Z" />
          </svg>
        </div>
  
        {/* Bottom Mandala */}
        <div className="absolute bottom-0 right-0 w-40 h-40 opacity-10">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="w-full h-full text-orange-500"
          >
            <circle cx="50" cy="50" r="48" />
            <circle cx="50" cy="50" r="40" />
            <path d="M50 2 L60 20 H40 Z" />
            <path d="M50 98 L60 80 H40 Z" />
            <path d="M2 50 L20 60 V40 Z" />
            <path d="M98 50 L80 60 V40 Z" />
            <path d="M25 25 L50 50 L25 75 Z" />
            <path d="M75 25 L50 50 L75 75 Z" />
          </svg>
        </div>
  
        {/* Main Content */}
        <div className="z-10 flex items-center justify-center bg-orange-100 border-4 border-orange-500 rounded-full w-24 h-24 mb-6">
          <svg
            className="w-12 h-12 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-orange-600 mb-4">Profile Not Found</h1>
        <p className="text-center text-orange-700 mb-6">
          The profile you are looking for does not exist or may have been removed. Let's take you back home.
        </p>
        <a
          href="/"
          className="bg-orange-500 text-white py-2 px-6 rounded-md font-semibold shadow hover:bg-orange-600 transition"
        >
          Return Home
        </a>
        <div className="flex space-x-4 mt-6">
          <div className="bg-orange-500 w-4 h-4 rounded-full" />
          <div className="bg-orange-400 w-4 h-4 rounded-full" />
          <div className="bg-orange-300 w-4 h-4 rounded-full" />
        </div>
      </div>
    );
  }
  