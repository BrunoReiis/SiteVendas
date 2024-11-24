import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { cardConfig } from "../../config/card";
import React from "react";

export default function EquipePage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 animate-fade-left">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ color: "fullviolet" })}>
            Conheça a nossa Equipe!
          </h1>
        </div>
      </section>
      <section className="my-8 text-center justify-center items-center animate-fade-up">
        <div className="my-3 flex flex-wrap justify-center gap-4">
          {cardConfig.EquipeCard.map((item) => (
            <Card key={item.discordName} className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="font-bold text-large">{item.nome}</p>
                <small className="text-default-500">{item.discordName}</small>
                <h4 className="text-tiny uppercase font-bold">{item.cargo}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="select-none pointer-events-none max-h-60	object-cover rounded-xl"
                  src={item.img}
                  width={250}
                  height={300}
                />
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
