const FeaturesSection = () => {
    return (
      <section className="py-10 px-6 lg:px-20  text-center">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Unlock Your Potential with Expert Coaching
          </h2>
          <p className="text-lg text-gray-600">
            Our expert facilities are dedicated to nurturing each student's
            unique abilities. Experience personalized coaching that leads to
            outstanding academic results.
          </p>
        </div>
  
        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              src="https://via.placeholder.com/150" // Replace with actual image URL
              alt="Expert Faculty"
              className="w-full rounded-t-lg mb-4"
            />
            <h3 className="font-semibold text-gray-800">
              Expert Faculty Committed to Your Success
            </h3>
          </div>
  
          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              src="https://via.placeholder.com/150" // Replace with actual image URL
              alt="Tailored Coaching"
              className="w-full rounded-t-lg mb-4"
            />
            <h3 className="font-semibold text-gray-800">
              Tailored Coaching Plans for Every Student
            </h3>
          </div>
  
          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              src="https://via.placeholder.com/150" // Replace with actual image URL
              alt="Academic Excellence"
              className="w-full rounded-t-lg mb-4"
            />
            <h3 className="font-semibold text-gray-800">
              Proven Track Record of Academic Excellence
            </h3>
          </div>
        </div>
  
        {/* Call to Action */}
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-400">
          Sign up
        </button>
      </section>
    );
  };
  
  export default FeaturesSection;
  