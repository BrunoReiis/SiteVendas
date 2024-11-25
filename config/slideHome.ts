export type SlideHomeConfig = typeof slideHomeConfig;
import Bruno from '../public/cardsImgs/Bruno.jpeg'
import Celeste from '../public/cardsImgs/Celeste.jpg'
import Ga from '../public/cardsImgs/Ga.jpg'


export const slideHomeConfig = {
    Slides:[
        {
            alt: 'Bruno Reis',
            img: Bruno.src,
        },
        {
            alt: 'Celeste',
            img: Celeste.src,
        },
        {
            alt: 'Ga',
            img: Ga.src,
        },
    ],
}