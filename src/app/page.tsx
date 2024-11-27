import Link from "next/link";
import ThemeButton from "./components/themebutton/ThemeButton";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <>
      <div className="min-h-screen bg-primary-content">
        <ThemeButton />
        <p className="text-primary">hi i am a devloper</p>
        <Link href="/notes" >link</Link>
      </div>
    </>
  );
}
