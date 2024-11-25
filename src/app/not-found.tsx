import Link from "next/link";

const NotFoundPage: React.FC = () => {
  return (
    <div className="lg:px-24 md:px-44 px-4 items-center min-h-screen flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 bg-primary-content">
      {/* Left Section: Text and Button */}
      <div className="w-full xl:w-1/2 relative lg:pb-0">
        <div className="relative">
          {/* 404 Image with a girl sitting */}
          <div className="relative">
            <img
              src="https://i.ibb.co/G9DC8S0/404-2.png"
              alt="404 Error Image"
              className="relative z-10"
            />
            {/* Girl sitting on 404 */}
            <img
              src="/404/girl.png" // Transparent PNG for girl
              alt="Girl sitting on 404 text"
              className="absolute z-20 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          {/* Text */}
          <div className="mt-8">
            <h1 className="my-2 text-secondary font-bold text-2xl">
              Looks like you've found the doorway to the great nothing
            </h1>
            <p className="my-2 text-white">
              Sorry about that! Please visit our homepage to get where you need to go.
            </p>
            {/* Button with Link */}
            <Link href="/" passHref>
              <button className="sm:w-full lg:w-auto my-2 border-indigo-600 rounded-md py-4 px-8 text-center bg-indigo-600 hover:bg-indigo-800 text-white">
                Go back to home
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section: Another Image */}
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="Illustration" />
      </div>
    </div>
  );
};

export default NotFoundPage;
