export type CardProdConfig = typeof cardProdConfig;
import Bruno from '../public/cardsImgs/Bruno.jpeg';

export const cardProdConfig = {
  categories: {
    mercado: [
      {
        name: 'Prod1',
        price: 49.99,
        img: Bruno.src,
      },
      {
        name: 'Prod2',
        price: 49.99,
        img: Bruno.src,
      },
      {
        name: 'Prod3',
        price: 49.99,
        img: Bruno.src,
      },
    ],
    eletronicos: [
      {
        name: 'Prod4',
        price: 49.99,
        img: Bruno.src,
      },
    ],
    roupas: [
      {
        name: 'Prod5',
        price: 49.99,
        img: Bruno.src,
      },
      {
        name: 'Prod6',
        price: 49.99,
        img: Bruno.src,
      },
    ],
  },
};
