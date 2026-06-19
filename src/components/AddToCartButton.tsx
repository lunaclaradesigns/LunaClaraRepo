"use client";

import { useCart } from "@/context/CartContext";

type Props = {
  product: {
    id: string;
    title: string;
    price: number;
    imageUrl?: string;
    category?: string;
  };
  className?: string;
};

export default function AddToCartButton({ product, className = "" }: Props) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product)}
      className={`w-full font-body text-xs uppercase tracking-widest border border-gold text-gold py-2.5 hover:bg-gold hover:text-warm-white transition-colors ${className}`}
    >
      Add to Cart
    </button>
  );
}
