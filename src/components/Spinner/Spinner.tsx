function Spinner() {
  return (
    <div className="absolute z-10 flex h-full w-full items-center justify-center bg-slate-700 bg-opacity-50">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );
}

export default Spinner;
