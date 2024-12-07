import PagesComponent from "@/components/pagesComponent";
import Navigation from "@/components/navigationComponent";


export default function Home() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="container mx-auto">
          <PagesComponent />
      </main>
    </>
  );
}
