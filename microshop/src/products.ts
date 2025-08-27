export {products}

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
  }
  
const products: Product[] = [
    { id: 1, title: "Товар 1", description: "Описание товара 1", price: 1000, image: "https://placehold.co/200x200" },
    { id: 2, title: "Товар 2", description: "Описание товара 2", price: 1500, image: "https://placehold.co/200x200" },
    { id: 3, title: "Товар 3", description: "Описание товара 3", price: 2000, image: "https://placehold.co/200x200" },
    { id: 3, title: "Товар 4", description: "Описание товара 4", price: 2000, image: "https://placehold.co/200x200" },
  ];