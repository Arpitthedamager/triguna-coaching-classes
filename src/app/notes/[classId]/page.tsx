import Link from "next/link";

interface Props {
  params: { classId: string };
}

const ClassNotes = ({ params }: Props) => {
  const { classId } = params;

  const subjects = [
    { id: "math", name: "Mathematics" },
    { id: "science", name: "Science" },
    { id: "english", name: "English" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Notes for {classId.replace("class", "Class ")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {subjects.map((sub) => (
          <Link key={sub.id} href={`/notes/${classId}/${sub.id}`} passHref>
            <div className="bg-white shadow-md hover:shadow-lg transition-all p-6 rounded-lg cursor-pointer">
              <h2 className="text-xl font-semibold">{sub.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClassNotes;
