import spinner from '../../assets/spinner.svg';
import './index.css';

// A simple loading indicator, used while fetching data before displaying the grid
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
