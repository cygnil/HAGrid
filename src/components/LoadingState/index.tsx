import spinner from '../../assets/spinner.svg';
import './index.css';

export function LoadingState() {
  return (
    <div className="loading-state">
      <span className="loading-state-spinner">
        <img src={spinner} alt="Loading..." />
      </span>
      <span>Loading...</span>
    </div>
  )
}
