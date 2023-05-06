const Loading = () => {
  return (
    <div className="flex h-screen items-center">
      <div
        className="m-auto flex h-10 w-10 animate-spin items-center justify-center rounded-full border-4 border-current border-t-transparent text-red-main"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
