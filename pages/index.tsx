import DefaultLayout from "@/layouts/default";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { slideHomeConfig } from "../config/slideHome";
import { cardProdConfig } from "../config/cardProd";

export default function IndexPage() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        return (prevSlide + 1) % slideHomeConfig.Slides.length;
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <DefaultLayout>
      <section className="animate-fade-up">
        <div className="w-full">
          {/* Slider Container */}
          <div className="relative aspect-video w-full h-[80px] md:h-[150px] overflow-hidden">
            <div className="flex w-full transition-transform duration-500 ease-in-out">
              <div
                className="flex-shrink-0 w-full h-full"
                key={slideHomeConfig.Slides[currentSlide].alt}
              >
                <Image
                  className="border-4 border-black-500/75"
                  width={1440}
                  height={150}
                  src={slideHomeConfig.Slides[currentSlide].img}
                  alt={slideHomeConfig.Slides[currentSlide].alt}
                  draggable="false"
                />
              </div>
            </div>
          </div>
          {/* Products Cards */}
          <div>
            {Object.entries(cardProdConfig.categories).map(
              ([category, products]) => (
                <div key={category} className="py-4">
                  {/* Título da Categoria */}
                  <h2 className="text-2xl font-bold mb-4">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h2>

                  {/* Produtos da Categoria */}
                  {screenWidth <= 800 ? (
                    <Swiper
                      spaceBetween={16}
                      slidesPerView={2}
                      breakpoints={{
                        400: {
                          slidesPerView: 1.5,
                        },
                        600: {
                          slidesPerView: 2,
                        },
                      }}
                    >
                      {products.map((item) => (
                        <SwiperSlide key={item.name}>
                          <Card className="py-4" isPressable>
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                              <p className="font-bold text-large">{item.name}</p>
                              <small className="text-default-500">
                                {new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(item.price)}
                              </small>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                              <Image
                                alt={`Imagem de ${item.name}`}
                                className="select-none pointer-events-none max-h-60 object-cover rounded-xl"
                                src={item.img}
                                width={250}
                                height={300}
                              />
                            </CardBody>
                          </Card>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {products.map((item) => (
                        <Card key={item.name} className="py-4" isPressable>
                          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="font-bold text-large">{item.name}</p>
                            <small className="text-default-500">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(item.price)}
                            </small>
                          </CardHeader>
                          <CardBody className="overflow-visible py-2">
                            <Image
                              alt={`Imagem de ${item.name}`}
                              className="select-none pointer-events-none max-h-60 object-cover rounded-xl"
                              src={item.img}
                              width={250}
                              height={300}
                            />
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
