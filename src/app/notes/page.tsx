import Link from "next/link";

const NotesOverview = () => {
  const classes = [
    { id: "class10", name: "Class 10" },
    { id: "class12", name: "Class 12" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Notes by Class</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {classes.map((cls) => (
          <Link key={cls.id} href={`/notes/${cls.id}`} passHref>
            <div className="bg-white shadow-md hover:shadow-lg transition-all p-6 rounded-lg cursor-pointer">
              <h2 className="text-xl font-semibold">{cls.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotesOverview;
