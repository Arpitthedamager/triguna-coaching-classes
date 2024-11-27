const StatisticsGraph = () => {
    const data = [120, 350, 480, 750, 600, 900, 1000, 950, 1150, 1300];  // Example data
  
    return (
      <div className="card bg-base-100 shadow-lg p-4 h-72">
        <h2 className="card-title text-lg font-semibold">Statistics</h2>
        <div className="flex items-end justify-between mt-4 space-x-4">
          {data.map((value, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className="bg-primary-a30 w-8"
                style={{
                  height: `${(value / 1500) * 100}%`,  // Adjust based on data
                  transition: "height 0.3s ease-in-out", // Smooth transition
                }}
              ></div>
              <span className="text-sm">{2010 + index}</span> {/* Dynamic Year Labels */}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default StatisticsGraph;
  