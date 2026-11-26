"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, ShoppingBag, Minus, Plus } from "lucide-react";
import { useCart } from "@/components/ui/context/cartContext";

gsap.registerPlugin(ScrollTrigger);

type Category =
  | "All"
  | "Starters"
  | "Mains"
  | "Seafood"
  | "Pasta"
  | "Desserts";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<Category, "All">;
  image: string;
}

const categories: Category[] = [
  "All",
  "Starters",
  "Mains",
  "Seafood",
  "Pasta",
  "Desserts",
];

const menuItems: MenuItem[] = [
  {
    id: "sushi",
    name: "Sushi ",
    description: "Artisanal rolls crafted with delicate seasoning and fresh garnish",
    price: 2800,
    category: "Starters",
    image: "/images/noir/suchiImage.jpeg",
  },
  {
    id: "lasagna",
    name: "Lasagna",
    description: "Layered baked pasta with rich savory sauce and melted cheese",
    price: 3600,
    category: "Pasta",
    image: "/images/noir/Lasagna.jpeg",
  },
  {
    id: "grilled-beef-steak",
    name: "Grilled Beef Steak",
    description: "Flame-seared prime beef with aromatic herbs and savory jus",
    price: 6400,
    category: "Mains",
    image: "/images/noir/Grilled-Beef-Steak.jpeg",
  },
  {
    id: "shrimp-pad-thai",
    name: "Shrimp Pad Thai",
    description: "Wok-tossed noodles with tender shrimp, peanuts, and tangy glaze",
    price: 3400,
    category: "Pasta",
    image: "/images/noir/Shrimp-Pad-Thai.jpeg",
  },
  {
    id: "roasted-chicken-breast",
    name: "Roasted Chicken Breast",
    description: "Golden oven-roasted chicken breast with herb butter finish",
    price: 3100,
    category: "Mains",
    image: "/images/noir/Roasted-Chicken-Breast.jpeg",
  },
  {
    id: "beef-stir-fry-noodles",
    name: "Beef Stir Fry Noodles",
    description: "Savory stir-fried noodles tossed with tender beef strips",
    price: 3300,
    category: "Pasta",
    image: "/images/noir/Beef-Stir-Fry-Noodles.jpeg",
  },
  {
    id: "pan-seared-duck-breast",
    name: "Pan Seared Duck Breast",
    description: "Crisp-skinned duck breast served tender and juicy",
    price: 5800,
    category: "Mains",
    image: "/images/noir/Pan-Seared-Duck-Breas.jpeg",
  },
  {
    id: "kung-pao-chicken",
    name: "Kung Pao Chicken",
    description: "Bold wok-seared chicken with roasted nuts and mild chili heat",
    price: 2950,
    category: "Starters",
    image: "/images/noir/Kung-Pao-Chicken.jpeg",
  },
  {
    id: "pan-seared-salmon",
    name: "Pan Seared Salmon",
    description: "Delicate salmon fillet seared to a crisp golden crust",
    price: 5200,
    category: "Seafood",
    image: "/images/noir/Pan-Seared-Salmon.jpeg",
  },
  {
    id: "chicken-cordon-bleu",
    name: "Chicken Cordon Bleu",
    description: "Crispy breaded chicken stuffed with savory filling",
    price: 3500,
    category: "Mains",
    image: "/images/noir/Chicken-Cordon-Bleu.jpeg",
  },
  {
    id: "beef-tenderloin-steak",
    name: "Beef Tenderloin Steak",
    description: "Succulent tenderloin cut seared to perfection",
    price: 7200,
    category: "Mains",
    image: "/images/noir/Beef-Tenderloin-Steak.jpeg",
  },
  {
    id: "chicken-seekh-kebab",
    name: "Chicken Seekh Kebab",
    description: "Spiced minced chicken skewers grilled over open flame",
    price: 2200,
    category: "Starters",
    image: "/images/noir/Chicken-Seekh-Kebab.jpeg",
  },
  {
    id: "italian-margherita-pizza",
    name: "Italian Margherita Pizza",
    description: "Wood-fired crust topped with tomato, mozzarella, and basil",
    price: 2700,
    category: "Starters",
    image: "/images/noir/Italian-Margherita-Pizza.jpeg",
  },
  {
    id: "teriyaki-glazed-chicken",
    name: "Teriyaki Glazed Chicken",
    description: "Tender chicken glazed in sweet and savory teriyaki reduction",
    price: 3150,
    category: "Mains",
    image: "/images/noir/Teriyaki-Glazed-Chicken.jpeg",
  },
  {
    id: "grilled-lamb-chops",
    name: "Grilled Lamb Chops",
    description: "Char-grilled lamb chops seasoned with rosemary and garlic",
    price: 6900,
    category: "Mains",
    image: "/images/noir/Grilled-Lamb-Chops.jpeg",
  },
  {
    id: "beef-steak-tacos",
    name: "Beef Steak Tacos",
    description: "Warm tortillas filled with seared beef steak and fresh toppings",
    price: 2450,
    category: "Starters",
    image: "/images/noir/Beef-Steak-Tacos.jpeg",
  },
  {
    id: "crispy-chicken-tenders",
    name: "Crispy Chicken Tenders",
    description: "Golden crunchy chicken strips seasoned for a light bite",
    price: 2100,
    category: "Starters",
    image: "/images/noir/Crispy-Chicken-Tenders.jpeg",
  },
  {
    id: "japanese-beef-shoyu-ramen",
    name: "Japanese Beef Shoyu Ramen",
    description: "Rich soy-based broth with ramen noodles and tender beef",
    price: 3800,
    category: "Pasta",
    image: "/images/noir/Japanese-Beef-Shoyu-Ramen.jpeg",
  },
  {
    id: "classic-fettuccine-alfredo-pasta",
    name: "Classic Fettuccine Alfredo Pasta",
    description: "Silky parmesan cream sauce tossed with fettuccine pasta",
    price: 3250,
    category: "Pasta",
    image: "/images/noir/Classic-Fettuccine-Alfredo-Pasta.jpeg",
  },
  {
    id: "garlic-butter-sauteed-prawns-with-lemon",
    name: "Garlic Butter Sautéed Prawns with Lemon",
    description: "Juicy prawns sautéed in garlic herb butter with fresh lemon",
    price: 4900,
    category: "Seafood",
    image: "/images/noir/Garlic-Butter-Sautéed-Prawns with-Lemon.jpeg",
  },
  {
    id: "creamy-wild-mushroom-risotto-with-parmesan-and-truffle",
    name: "Creamy Wild Mushroom Risotto with Parmesan & Truffle",
    description: "Slow-cooked arborio rice with wild mushrooms, parmesan, and truffle",
    price: 3950,
    category: "Pasta",
    image:
      "/images/noir/Creamy-Wild-Mushroom-Risotto-with-Parmesan-&-Truffle.jpeg",
  },
  {
    id: "classic-seafood-paella",
    name: "Classic Seafood Paella",
    description: "Aromatic saffron rice cooked with assorted seafood",
    price: 5600,
    category: "Seafood",
    image: "/images/noir/Classic-Seafood-Paella.jpeg",
  },
  {
    id: "truffle-mac-and-cheese",
    name: "Truffle Mac and Cheese",
    description: "Creamy baked macaroni with sharp cheese and truffle aroma",
    price: 2850,
    category: "Pasta",
    image: "/images/noir/Truffle-Mac-and-Cheese.jpeg",
  },
  {
    id: "slow-braised-beef-short-ribs-with-roasted-vegetables",
    name: "Slow Braised Beef Short Ribs with Roasted Vegetables",
    description: "Fork-tender braised short ribs paired with roasted vegetables",
    price: 7600,
    category: "Mains",
    image:
      "/images/noir/Slow-Braised-Beef-Short-Ribs-with-Roasted-Vegetables.jpeg",
  },
  {
    id: "spicy-italian-tomato-pasta",
    name: "Spicy Italian Tomato Pasta",
    description: "Pasta tossed in a vibrant, mildly spicy tomato herb sauce",
    price: 2950,
    category: "Pasta",
    image: "/images/noir/Spicy-Italian-Tomato-Pasta.jpeg",
  },
  {
    id: "japanese-chicken-katsu-curry-with-steamed-rice",
    name: "Japanese Chicken Katsu Curry with Steamed Rice",
    description: "Crispy chicken katsu served with savory curry and steamed rice",
    price: 3450,
    category: "Starters",
    image:
      "/images/noir/Japanese-Chicken-Katsu-Curry-with-Steamed-Rice.jpeg",
  },
];

export default function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const { addToCart } = useCart();

  const getQty = (id: string) => quantities[id] ?? 1;

  const changeQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] ?? 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children
        ? Array.from(gridRef.current.children)
        : [];
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory, searchQuery]);

  const handleAddDish = (item: MenuItem) => {
    const qty = getQty(item.id);
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
      });
    }
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#12100F] py-10 sm:py-14 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-[#D4C4B0]/15 mb-8">
          
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            {categories.map((category, index) => {
              const isSelected = activeCategory === category;
              return (
                <div key={category} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded text-[13px] sm:text-[14px] font-medium transition-colors duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#9f0022]/50 text-[#F5F2EB]"
                        : "text-[#D4C4B0]/80 hover:text-[#F5F2EB]"
                    }`}
                  >
                    {category}
                  </button>
                  {index < categories.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="h-4 w-[1px] bg-[#D4C4B0]/20 ml-1.5 sm:ml-2"
                    />
                  )}
                </div>
              );
            })}
          </div>

         
          <div className="relative w-full sm:w-72 lg:w-64 shrink-0">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D4C4B0]/55 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes..."
              className="w-full pl-9 pr-4 py-2 rounded bg-[#171514] border border-[#D4C4B0]/15 focus:border-[#D4C4B0]/45 text-[13px] text-[#F5F2EB] placeholder:text-[#D4C4B0]/45 outline-none transition-colors"
            />
          </div>
        </div>

        
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-xl text-[#D4C4B0]">No dishes found</p>
            <p className="text-sm text-[#F5F2EB]/70 mt-1">
              Try another category or clear your search query.
            </p>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 xl:grid-cols-2 gap-6"
          >
            {filteredItems.map((item) => {
              const qty = getQty(item.id);

              return (
                <article
                  key={item.id}
                  className="flex flex-col sm:flex-row rounded bg-[#171514] border border-[#D4C4B0]/15 overflow-hidden hover:border-[#D4C4B0]/30 transition-colors"
                >
                  
                  <div className="relative w-full sm:w-[240px] md:w-[260px] h-52 sm:h-auto min-h-[195px] shrink-0 bg-[#1A1715]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 260px"
                      className="object-cover object-center"
                    />
                  </div>

                  
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-[20px] sm:text-[22px] font-normal text-[#D4C4B0] leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-[13px] sm:text-[14px] font-light text-[#F5F2EB]/90 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="text-[14px] sm:text-[15px] font-medium text-[#D4C4B0] mb-3.5">
                        PKR {item.price.toLocaleString()}
                      </p>

                      
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center justify-between min-w-[96px] px-3 py-2 rounded bg-[#1A1715] border border-[#D4C4B0]/15 text-[#F5F2EB]/90 text-[13px]">
                          <button
                            type="button"
                            onClick={() => changeQty(item.id, -1)}
                            aria-label={`Decrease quantity for ${item.name}`}
                            className="text-[#D4C4B0]/70 hover:text-[#F5F2EB] transition-colors cursor-pointer"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="font-medium select-none">{qty}</span>
                          <button
                            type="button"
                            onClick={() => changeQty(item.id, 1)}
                            aria-label={`Increase quantity for ${item.name}`}
                            className="text-[#D4C4B0]/70 hover:text-[#F5F2EB] transition-colors cursor-pointer"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddDish(item)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#9f0022]/50 hover:bg-[#9f0022]/80 text-[#F5F2EB] text-[13px] font-medium transition-colors duration-200 cursor-pointer"
                        >
                          <ShoppingBag size={14} strokeWidth={1.8} />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}