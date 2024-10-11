import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [text, setText] = useState("");
  const router = useRouter();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      try {
        const result = await fetch(`/api/pokemon?id=2`);
      const resultJson = await result.json();
      console.log({ resultJson });
      setData(resultJson);
      } catch(error){
        console.error("Failed to fetch Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    };
    void request();
  }, []);

  const redirectToSearch = () => {
    router.push("/pokedex");
  };

  const redirectToDetail = () => {
    router.push("/pokedex/view/2");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>Condorsoft</title>
        <meta name="description" content="Condorsoft technical test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen items-center justify-center">
        <div
          className="relative h-[500px] w-full max-w-3xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/home.png')" }}
        >
          <div
            className="absolute max-w-56"
            style={{ top: "152px", left: "67px" }}
          >
            <div className="flex justify-between">
              <span>{data.name}</span>
              <span>{data.n123}</span>
            </div>

            <p className="text-left text-sm">Electric</p>

            <p className="text-left text-sm">
              {data?.description
                ? data.description.length > 90
                  ? `${data.description.substring(0, 90)}...`
                  : data.description
                : "No description available"}
            </p>

            {/* Height and Weight */}
            <div className="flex justify-between">
              <div>
                <span className="block">Height</span>
                <span className="block">{data.height}</span>
              </div>
              <div>
                <span className="block">Weight</span>
                <span className="block">{data.weight}</span>
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-20 left-10"
            style={{ left: "97px", bottom: "37px" }}
          >
            <button
              className="rounded-lg px-6 py-2 text-black"
              onClick={redirectToSearch}
            >
              Search
            </button>
          </div>

          <div className="absolute" style={{ right: "234px", bottom: "34px" }}>
            <button
              className="rounded-lg px-6 py-2 text-black"
              onClick={redirectToDetail}
            >
              View More
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
