"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    closeCart();
    router.push("/cart");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-warm-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
          <h2 className="font-heading text-2xl text-charcoal">
            Your Cart
            {totalItems > 0 && (
              <span className="ml-2 font-body text-sm text-soft-gray">({totalItems} items)</span>
            )}
          </h2>
          <button onClick={closeCart} className="text-charcoal hover:text-gold transition-colors p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="text-5xl">🛍️</div>
              <p className="font-heading text-xl text-charcoal">Your cart is empty</p>
              <p className="font-body text-sm text-soft-gray">Add some beautiful pieces to get started.</p>
              <button
                onClick={closeCart}
                className="mt-2 text-sm font-body uppercase tracking-widest text-gold border border-gold px-6 py-2.5 hover:bg-gold hover:text-warm-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 pb-5 border-b border-champagne last:border-0">
                  {/* Image placeholder */}
                  <div className="w-20 h-24 flex-shrink-0 placeholder-image rounded-sm text-center text-xs">
                    <span className="text-soft-gray text-xs">img</span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col gap-1">
                    <p className="font-body text-sm text-charcoal font-medium leading-snug">{item.title}</p>
                    <p className="font-body text-gold text-sm">${item.price.toFixed(2)}</p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 border border-gold/40 text-charcoal hover:border-gold hover:text-gold transition-colors text-sm flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="font-body text-sm w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 border border-gold/40 text-charcoal hover:border-gold hover:text-gold transition-colors text-sm flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-soft-gray hover:text-charcoal transition-colors self-start mt-0.5"
                    aria-label="Remove item"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gold/20 px-6 py-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="font-body text-sm text-soft-gray uppercase tracking-wider">Subtotal</span>
              <span className="font-heading text-2xl text-charcoal">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="font-body text-xs text-soft-gray">Shipping and taxes calculated at checkout.</p>
            <button
              onClick={handleCheckout}
              className="w-full bg-gold text-warm-white font-body text-sm uppercase tracking-widest py-4 hover:bg-gold-light hover:text-charcoal transition-colors"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={closeCart}
              className="w-full border border-gold/40 text-charcoal font-body text-sm uppercase tracking-widest py-3 hover:border-gold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
