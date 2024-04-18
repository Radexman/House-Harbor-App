function Spinner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-slate-700 bg-opacity-50">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );
}

export default Spinner;
