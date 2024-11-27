interface Props {
    params: { subjectId: string; chapterId: string };
  }
  
  const ChapterNotes = ({ params }: Props) => {
    const {  subjectId, chapterId } = params;
  
    const notes = [
      { title: "Definition", content: "A detailed explanation of key terms..." },
      { title: "Examples", content: "Practical examples related to the topic..." },
      { title: "Exercises", content: "Practice questions and answers..." },
    ];
  
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Notes for {chapterId.replace("chapter", "Chapter ")} ({subjectId})
        </h1>
        <div className="space-y-4 max-w-4xl mx-auto">
          {notes.map((note, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-lg transition-all p-6 rounded-lg"
            >
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="mt-2 text-gray-600">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ChapterNotes;
  