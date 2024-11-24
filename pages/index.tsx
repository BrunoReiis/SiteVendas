import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { NexusLogo } from "@/components/icons";

import React, { useEffect, useState } from "react";

export default function IndexPage() {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const sectionClassNames = () => {
    if (screenWidth <= 800) {
      return "flex flex-col md:flex-row ml-2 mr-2 space-x-0 md:space-x-4";
    }
    if (screenWidth <= 1500) {
      return "flex flex-col md:flex-row ml-2 mr-2 mt-16 space-x-0 md:space-x-4";
    } else {
      return "flex flex-col md:flex-row ml-2 mr-2 mt-48 space-x-0 md:space-x-4";
    }
  };

  const divNexusLogo = () => {
    if (screenWidth <= 800) {
      return "w-full md:w-3/5 mt-9 md:mt-0 flex justify-center items-center";
    } else {
      return "w-full md:w-3/5 mt-4 md:mt-0 flex justify-center items-center";
    }
  };

  return (
    <DefaultLayout>
      <section className={`${sectionClassNames()} animate-fade-up`}>
        <div className="w-full md:w-2/5">
          <h1 className={title({ color: "fullviolet", size: "lg" })}>
            {siteConfig.nameNormal}
          </h1>
          <p className="text-large mt-3 text-justify">
            Bem-vindo ao nosso site, a solução completa para o gerenciamento
            eficiente de produtos. Desenvolvemos uma plataforma intuitiva e
            poderosa que ajuda empresas a organizarem seus estoques,
            acompanharem vendas e otimizarem seus processos. Com nossas
            ferramentas, você tem controle total sobre seus produtos, garantindo
            decisões rápidas e assertivas. Explore nossas funcionalidades e
            descubra como podemos simplificar a gestão do seu negócio!
          </p>
        </div>
        <div className={divNexusLogo()}>
          <NexusLogo size={300} />
        </div>
      </section>
    </DefaultLayout>
  );
}
