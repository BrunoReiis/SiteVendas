export type SlideHomeConfig = typeof slideHomeConfig;
import Slide1 from '../public/bannerSlides/1.png'
import Slide2 from '../public/bannerSlides/2.png'
import Slide3 from '../public/bannerSlides/3.png'


export const slideHomeConfig = {
    Slides:[
        {
            alt: 'Slide Frete',
            img: Slide1.src,
        },
        {
            alt: 'Moda Feminina',
            img: Slide2.src,
        },
        {
            alt: 'Black Friday',
            img: Slide3.src,
        },
    ],
}