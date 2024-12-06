// components/FeedbackSection.tsx
import React from "react";

interface Feedback {
  name: string;
  achievement: string;
  feedback: string;
}

const FeedbackSection: React.FC = () => {
  const feedbacks: Feedback[] = [
    {
      name: "Mohit Gola",
      achievement: "Jee Advance Topper",
      feedback: "This Coaching center helped me to achieve my success",
    },
    {
      name: "Ram",
      achievement: "98% in 12th CBSE Board",
      feedback: "The Faculty is incredibly supportive and knowledgeable.",
    },
  ];

  return (
    <div className="py-6 px-52 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-black mb-2">Students Feedback</h2>
      <p className="text-gray-600 mb-6">
        Transformative experience of education
      </p>
      <div className="space-y-6">
        {feedbacks.map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 border-b border-gray-300 pb-4"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <div className="flex items-center mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.432l-5.5 5.368 1.3 8.518L12 18.896l-7.8 4.422 1.3-8.518L0 9.432l8.332-1.277L12 .587z" />
                    </svg>
                  ))}
              </div>
              <p className="text-gray-800 font-medium text-lg mb-2">
                “ {item.feedback} “
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">{item.name}</span>, {item.achievement}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition duration-300">
        Any Many More...
      </button>
    </div>
  );
};

export default FeedbackSection;
