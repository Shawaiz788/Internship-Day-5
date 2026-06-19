import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Product } from './interface';
import { zustandStorage } from './mmkv';



export interface CartState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
  items: number;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      items: 0,

      addProduct: (product: Product) =>
        set((state) => {
          const hasProduct = state.products.find(
            (p) => p.id === product.id
          );

          if (hasProduct) {
            return {
              items: state.items + 1,
              products: state.products.map((p) =>
                p.id === product.id
                  ? { ...p, quantity: p.quantity + 1 }
                  : p
              ),
            };
          }

          return {
            items: state.items + 1,
            products: [...state.products, { ...product, quantity: 1 }],
          };
        }),

      reduceProduct: (product: Product) =>
        set((state) => ({
          items: Math.max(state.items - 1, 0),
          products: state.products
            .map((p) =>
              p.id === product.id
                ? { ...p, quantity: p.quantity - 1 }
                : p
            )
            .filter((p) => p.quantity > 0),
        })),

      clearCart: () =>
        set({
          products: [],
          items: 0,
        }),
    }),
    {
      name: 'cart-storage',
      storage:createJSONStorage(()=>zustandStorage),
    }
  )
);

export default useCartStore;