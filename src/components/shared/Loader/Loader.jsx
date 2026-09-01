import "./Loader.css";

function Loader({ label = "Loading", fullScreen = false, inline = false, className = "" }) {
  return (
    <div
      className={`app-loader ${fullScreen ? "app-loader--fullscreen" : ""} ${inline ? "app-loader--inline" : ""} ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      <div className="app-loader__mark" aria-hidden="true">
        <span className="app-loader__ring" />
        <span className="app-loader__dot" />
      </div>
      <span className="app-loader__label">{label}</span>
    </div>
  );
}

export default Loader;
