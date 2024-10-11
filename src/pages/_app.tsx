import { useState, useEffect } from "react";
import { type AppType } from "next/dist/shared/lib/utils";
import { SnackbarProvider } from "notistack";
import Header from "~/components/Header";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    setBackgroundImage("url('/pokedex.png')");
  }, []);

  return (
    <>
      <div
        className="min-h-screen w-full bg-cover bg-no-repeat"
        style={backgroundImage ? { backgroundImage } : undefined}
      >
        <Header />
        <div className="pt-8"></div>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Component {...pageProps} />
        </SnackbarProvider>
      </div>
    </>
  );
};

export default MyApp;
