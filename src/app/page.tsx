import Link from "next/link";
import ThemeButton from "./components/themebutton/ThemeButton";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <>
      <div className="min-h-screen bg-primary-content">
        <ThemeButton />
        <p className="text-secondary p-20 bg-primarycontent">hi i am a devloper</p>
        <Link href="/notes">link</Link>
        {/* <div className="grid gap-4">
          <div className="bg-secondary text-white p-4 rounded">
            Secondary: #f000b8
          </div>
          <div className="bg-primary text-white p-4 rounded">
            Primary: #570df8
          </div>
          <div className="bg-accent text-white p-4 rounded">
            Accent: #37cdbe
          </div>
          <div className="bg-neutral text-white p-4 rounded">
            Neutral: #3d4451
          </div>
          <div className="bg-base-100 text-black p-4 rounded">
            {" "}
            Base-100: #ffffff
          </div>
          <div className="bg-info text-black p-4 rounded">Info: #3abff8</div>
          <div className="bg-success text-black p-4 rounded">
            Success: #36d399
          </div>
          <div className="bg-warning text-black p-4 rounded">
            Warning: #fbbd23
          </div>
          <div className="bg-error text-black p-4 rounded">Error: #f87272</div>
          <div className="bg-primary text-primary-content p-4 rounded">Primary</div>
          <div className="bg-secondary text-secondary-content p-4 rounded">Secondary
          </div>
          <div className="bg-accent text-accent-content p-4 rounded">Accent</div>
          <div className="bg-neutral text-neutral-content p-4 rounded">Neutral</div>
          <div className="bg-base-100 text-base-content p-4 rounded">Base 100</div>
          <div className="bg-info text-info-content p-4 rounded">Info</div>
          <div className="bg-success text-success-content p-4 rounded">Success</div>
          <div className="bg-warning text-warning-content p-4 rounded">Warning</div>
          <div className="bg-error text-error-content p-4 rounded">Error</div>
        </div> */}
      </div>
    </>
  );
}
