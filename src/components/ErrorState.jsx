import { RefreshCw } from 'lucide-react';

function ErrorState({ message, onRetry }) {
  return (
    <div className="state-box error">
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn secondary" onClick={onRetry}>
          <RefreshCw size={16} />
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorState;
