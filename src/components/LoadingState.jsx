function LoadingState({ label = 'Loading records...' }) {
  return (
    <div className="state-box">
      <div className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

export default LoadingState;
