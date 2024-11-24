import { DiscordIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function SobrePage() {
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
  console.log(screenWidth);

  return (
    <DefaultLayout>
      <section className="-mt-24 flex flex-col items-center justify-center gap-4 py-8 md:py-10 animate-fade-left">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ color: "fullviolet" })}>Sobre Nós</h1>
        </div>
      </section>
      <section className="animate-fade-up">
        <h1 className={title({ color: "fullviolet", size: "sm" })}>
          Quem Somos
        </h1>
        <p className="text-large mb-4">
          Somos uma equipe dedicada a oferecer soluções eficientes para o
          gerenciamento de produtos, proporcionando ferramentas intuitivas que
          facilitam o controle, a organização e o acompanhamento de todo o ciclo
          de vida dos seus produtos.
        </p>
        <h1 className={title({ color: "fullviolet", size: "sm" })}>
          Nossa Missão
        </h1>
        <p className="text-large mb-4">
          Nossa missão é simplificar o gerenciamento de produtos, ajudando
          empresas a otimizarem seus processos, melhorarem a produtividade e
          atingirem seus objetivos com mais rapidez e precisão.
        </p>
        <h1 className={title({ color: "fullviolet", size: "sm" })}>
          Nossos Serviços
        </h1>
        <p className="text-large">
          <span className="font-bold">Gestão de Estoques:</span> Monitore e
          controle o inventário em tempo real, evitando faltas ou excessos de
          produtos.
        </p>
        <p className="text-large">
          <span className="font-bold">Organização de Catálogo:</span> Centralize
          informações de produtos, descrições, imagens e especificações em um só
          lugar.
        </p>
        <p className="text-large">
          <span className="font-bold">Controle de Vendas:</span> Acompanhe as
          vendas, identifique tendências e tome decisões baseadas em dados.
        </p>
        <p className="text-large mb-4">
          <span className="font-bold">Relatórios e Análises:</span> Geração
          automática de relatórios detalhados sobre o desempenho de produtos,
          estoque e vendas.
        </p>
        <h1 className={title({ color: "fullviolet", size: "sm" })}>
          Por Que Escolher-nos
        </h1>
        <p className="text-large">
          <span className="font-bold">Facilidade de uso:</span> Interface
          intuitiva e amigável.
        </p>
        <p className="text-large">
          <span className="font-bold">Eficiência:</span> Redução do tempo gasto
          em tarefas manuais.
        </p>
        <p className="text-large">
          <span className="font-bold">Suporte:</span> Equipe pronta para ajudar
          sempre que necessário.
        </p>
        <h1 className={title({ color: "fullviolet", size: "sm" })}>
          Nossa Visão
        </h1>
        <p className="text-large mb-4">
          Queremos ser a referência no mercado de soluções para gerenciamento de
          produtos, ajudando empresas de todos os tamanhos a alcançar uma gestão
          mais inteligente, prática e eficaz.
        </p>
      </section>
    </DefaultLayout>
  );
}
