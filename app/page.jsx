import Feed from "@components/Feed";
import { headers } from "next/headers";

const Home = async () => {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // Fetching data server-side
  const response = await fetch(`${baseUrl}/api/prompt`, {
    cache: "no-store",
  });
  const data = await response.json();

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and share
        <br className="md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts.
      </p>

      <Feed allPosts={data} />
    </section>
  );
};

export default Home;
