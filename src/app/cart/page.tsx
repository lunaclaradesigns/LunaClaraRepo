"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-4xl md:text-5xl text-charcoal mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-24 flex flex-col items-center gap-4">
          <div className="text-6xl">🛍️</div>
          <p className="font-heading text-2xl text-charcoal">Your cart is empty</p>
          <p className="font-body text-soft-gray">Add some beautiful pieces to get started.</p>
          <Link
            href="/collections/individual"
            className="mt-4 bg-gold text-warm-white font-body text-sm uppercase tracking-widest px-8 py-4 hover:bg-gold-light hover:text-charcoal transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-5 pb-6 border-b border-champagne">
                <div className="w-24 h-28 flex-shrink-0 placeholder-image rounded-sm">
                  <span className="text-xs text-soft-gray">img</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-body text-base text-charcoal font-medium">{item.title}</h3>
                    <button onClick={() => removeItem(item.id)} className="text-soft-gray hover:text-charcoal transition-colors ml-4">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="font-body text-gold text-sm mt-1">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border border-gold/40 hover:border-gold transition-colors text-sm">
                      −
                    </button>
                    <span className="font-body text-sm w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border border-gold/40 hover:border-gold transition-colors text-sm">
                      +
                    </button>
                    <span className="ml-4 font-body text-sm text-soft-gray">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-champagne/40 border border-gold/20 p-6 sticky top-24">
              <h2 className="font-heading text-2xl text-charcoal mb-5">Order Summary</h2>
              <div className="flex flex-col gap-3 font-body text-sm">
                <div className="flex justify-between text-soft-gray">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-soft-gray">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gold/20 pt-3 mt-1 flex justify-between items-center">
                  <span className="font-heading text-lg text-charcoal">Total</span>
                  <span className="font-heading text-2xl text-gold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-gold text-warm-white font-body text-sm uppercase tracking-widest py-4 hover:bg-gold-light hover:text-charcoal transition-colors"
              >
                Secure Checkout
              </button>
              <p className="font-body text-xs text-soft-gray text-center mt-3">
                Apple Pay · Google Pay · Visa · Mastercard
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
