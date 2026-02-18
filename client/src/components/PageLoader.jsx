const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold tracking-tight">
          DevLog
        </h1>

        {/* animated pulse circle */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-900/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-gray-900 animate-ping"></div>
        </div>

        {/* progress bar */}
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gray-900 animate-[loading_1.2s_ease-in-out_infinite]"></div>
        </div>

        <p className="text-sm text-gray-500">
          Loading your logs...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
