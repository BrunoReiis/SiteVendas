import DefaultLayout from "@/layouts/default";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Import Image component from next/image

import { slideHomeConfig } from "../config/slideHome";

export default function IndexPage() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para o slide atual

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

  const sectionClassNames = () => {
    if (screenWidth <= 800) {
      return "flex flex-col md:flex-row ml-2 mr-2 space-x-0 md:space-x-4";
    }
    if (screenWidth <= 1500) {
      return "flex flex-col md:flex-row ml-2 mr-2 mt-4 space-x-0 md:space-x-4"; 
    } else {
      return "flex flex-col md:flex-row ml-2 mr-2 mt-0 space-x-0 md:space-x-4";  
    }
  };

  return (
    <DefaultLayout>
      <section className={`${sectionClassNames()} animate-fade-up`}>
        <div className="w-full md:w-5/5">
          {/* Slider Container */}
          <div className="relative aspect-video w-full h-[1440px] md:h-[150px] overflow-hidden border-4 border-black-500/75">
            <div className="flex w-full transition-transform duration-500 ease-in-out">
              <div className="flex-shrink-0 w-full h-full" key={slideHomeConfig.Slides[currentSlide].alt}>
                <Image
                  src={slideHomeConfig.Slides[currentSlide].img}
                  alt={slideHomeConfig.Slides[currentSlide].alt}
                  layout="fill" 
                  objectFit="fill" 
                  priority={true} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}