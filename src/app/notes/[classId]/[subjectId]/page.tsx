import Link from "next/link";

interface Props {
  params: { classId: string; subjectId: string };
}

const SubjectChapters = ({ params }: Props) => {
  const { classId, subjectId } = params;

  const chapters = [
    { id: "chapter1", name: "Introduction to the Subject" },
    { id: "chapter2", name: "Advanced Topics" },
    { id: "chapter3", name: "Applications and Examples" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Chapters for {subjectId} ({classId.replace("class", "Class ")})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/notes/${classId}/${subjectId}/${chapter.id}`}
            passHref
          >
            <div className="bg-white shadow-md hover:shadow-lg transition-all p-6 rounded-lg cursor-pointer">
              <h2 className="text-xl font-semibold">{chapter.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectChapters;
