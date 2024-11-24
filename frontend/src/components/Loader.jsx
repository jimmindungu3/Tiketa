import React from 'react';

const Loader = () => {
  return (
    <div className="my-24 flex items-center justify-center space-x-2">
      <div className="w-6 h-6 border-4 border-dashed border-red-500 rounded-full animate-spin"></div>
      <span className="text-xl font-bold text-red-500">Loading Events...</span>
    </div>
  );
};

export default Loader;
