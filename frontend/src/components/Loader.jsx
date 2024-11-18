import React from "react";

const Loader = () => {
  return (
    <div className="text-3xl font-bold text-red-100 text-center my-12">
      <div class="flex items-center justify-center space-x-2">
        <span>Loading Events</span>
        <span>
          <span class="dot">.</span>
          <span class="dot">.</span>
          <span class="dot">.</span>
        </span>
      </div>
    </div>
  );
};

export default Loader;
