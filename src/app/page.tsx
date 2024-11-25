import Image from "next/image";
import ThemeButton from "./components/themebutton/ThemeButton";

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-primary-content">
    <ThemeButton/>

      <p className="text-primary">hi i am a devloper</p>
    </div>
    </>
  );
}
