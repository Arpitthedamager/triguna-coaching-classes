const StatisticsGraph = () => {
    const data = [200, 300, 400, 700, 600];
  
    return (
      <div className="card bg-base-100 shadow-lg p-4">
        <h2 className="card-title">Statistics</h2>
        <div className="flex items-end justify-between mt-4">
          {data.map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="bg-blue-500 w-6"
                style={{ height: `${value / 10}%` }}
              ></div>
              <span className="text-sm mt-2">{2017 + index}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default StatisticsGraph;
  