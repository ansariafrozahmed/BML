import { Eye } from "lucide-react";
import React, { useState, useEffect } from "react";

const ViewsCounter = () => {
  const [counter, setCounter] = useState(0); // Start counter at 0
  const targetViews = 2000; // Target view count
  const duration = 2000; // Animation duration in milliseconds

  useEffect(() => {
    const increment = targetViews / (duration / 16); // Calculate increment for ~60fps
    const timer = setInterval(() => {
      setCounter((prev) => {
        const nextValue = Math.min(prev + increment, targetViews); // Ensure it doesn't exceed target
        if (nextValue === targetViews) clearInterval(timer); // Stop timer when target is reached
        return nextValue;
      });
    }, 16); // Run every 16ms for smooth animation (~60fps)

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [targetViews]);

  return (
    <div className="flex justify-start gap-2 text-white items-center">
      <span className="text-xs tracking-wider">views</span>
      <span className="flex items-center gap-1">
        <span className="text-xs">
          {Math.floor(counter).toLocaleString()} {/* Format number */}
        </span>
        <Eye size={16} strokeWidth={1.5} />
      </span>
    </div>
  );
};

export default ViewsCounter;
