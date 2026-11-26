"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/cartContext";

const formatPKR = (amount: number) => `PKR ${amount.toLocaleString("en-US")}`;

export default function CartSidebar() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/60 z-[90] transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#171514] border-l border-[#D4C4B0]/15 z-[100] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#D4C4B0]/15">
          <div>
            <h2 className="font-serif text-2xl font-normal text-[#D4C4B0]">
              Your Cart
            </h2>
            <p className="text-xs text-[#F5F2EB]/70 mt-0.5">
              {cartCount} {cartCount === 1 ? "Item" : "Items"}
            </p>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 rounded-full border border-[#D4C4B0]/20 text-[#F5F2EB]/80 hover:text-[#F5F2EB] hover:bg-[#1A1715] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-lg text-[#D4C4B0]">
                Your cart is empty
              </p>
              <p className="text-xs text-[#F5F2EB]/70 mt-1">
                Explore the menu to add dishes.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 items-start p-3 rounded-md bg-[#1A1715] border border-[#D4C4B0]/10"
              >
                <div className="relative w-16 h-16 rounded overflow-hidden shrink-0 bg-[#12100F]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-[#F5F2EB] truncate">
                      {item.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      className="text-[#F5F2EB]/50 hover:text-red-400 transition cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {item.description && (
                    <p className="text-xs text-[#F5F2EB]/65 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-[#171514] border border-[#D4C4B0]/15 rounded-md px-2 py-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="text-[#F5F2EB]/80 hover:text-[#D4C4B0] cursor-pointer"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-xs font-medium text-[#F5F2EB] min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="text-[#F5F2EB]/80 hover:text-[#D4C4B0] cursor-pointer"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <p className="text-sm font-medium text-[#D4C4B0]">
                      {formatPKR(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-6 py-5 border-t border-[#D4C4B0]/15 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#F5F2EB]/80">Subtotal</span>
              <span className="font-serif text-lg text-[#D4C4B0]">
                {formatPKR(cartTotal)}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-md bg-[#9f0022]/50 hover:bg-[#9f0022]/80 text-[#F5F2EB] text-sm font-medium tracking-wide transition-colors"
            >
              <span>Proceed to Checkout</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}