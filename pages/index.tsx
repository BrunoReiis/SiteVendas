import DefaultLayout from "@/layouts/default";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { slideHomeConfig } from "../config/slideHome";
import { getDataModalProducts } from "@/src/firebase/getData";

// Defina o tipo de um produto
interface Product {
  name: string;
  price: number;
  img: string;
  category: string;
  status: "active" | "paused" | "vacation"; // Adapte o status conforme necessário
}

export default function IndexPage() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({});

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

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getDataModalProducts();
        if (typeof fetchedProducts === "string") {
          console.error(fetchedProducts);
          setProductsByCategory({});
        } else {
          organizeProducts(fetchedProducts as Product[]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductsByCategory({});
      }
    }

    fetchProducts();
  }, []);

  function organizeProducts(products: Product[]) {
    const categories: Record<string, Product[]> = {};

    products.forEach((product) => {
      const { category, name, price, img } = product;
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push({
        name,
        price,
        img,
        category,
        status: product.status, // Inclua o status, caso seja necessário
      });
    });

    setProductsByCategory(categories);
  }

  const sectionClassNames = () => {
    if (screenWidth <= 800) {
      return "flex flex-col md:flex-row mt-0 ml-2 mr-2 space-x-0 md:space-x-4";
    }
    if (screenWidth <= 1500) {
      return "flex flex-col md:flex-row ml-2 mr-2 mt-4 space-x-0 md:space-x-4";
    }
  };

  return (
    <DefaultLayout>
      <section className={`${sectionClassNames()} animate-fade-up`}>
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
          <div className="w-full px-4">
            {Object.entries(productsByCategory).map(([category, products]) => (
              <div key={category} className="py-2">
                {/* Título da Categoria */}
                <h2 className="text-2xl font-bold mb-4">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>

                {/* Produtos da Categoria */}
                {screenWidth <= 800 ? (
                  <Swiper
                    spaceBetween={8}
                    slidesPerView={3}
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
                        <Card className="py-2" isPressable>
                          <CardHeader className="pb-0 pt-1 px-3 flex-col items-start">
                            <p className="font-bold text-base">{item.name}</p>
                            <small className="text-default-500">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(item.price)}
                            </small>
                          </CardHeader>
                          <CardBody className="overflow-visible py-1">
                            <Image
                              alt={`Imagem de ${item.name}`}
                              className="select-none pointer-events-none max-h-48 object-cover rounded-lg"
                              src={item.img}
                              width={200}
                              height={240}
                            />
                          </CardBody>
                        </Card>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {products.map((item) => (
                      <Card key={item.name} className="py-2" isPressable>
                        <CardHeader className="pb-0 pt-1 px-3 flex-col items-start">
                          <p className="font-bold text-base">{item.name}</p>
                          <small className="text-default-500">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(item.price)}
                          </small>
                        </CardHeader>
                        <CardBody className="overflow-visible py-1">
                          <Image
                            alt={`Imagem de ${item.name}`}
                            className="select-none pointer-events-none max-h-48 object-cover rounded-lg"
                            src={item.img}
                            width={200}
                            height={240}
                          />
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
