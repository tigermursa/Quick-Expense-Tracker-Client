import "./Loader.css";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="loader-wrapper">
        <div className="packman"></div>
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

//installed lenux perfectly
