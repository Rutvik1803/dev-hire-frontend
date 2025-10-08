const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-textSecondary font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
