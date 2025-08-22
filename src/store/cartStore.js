import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      panier: [],

      // Ajouter un plat au panier (même plat plusieurs fois)
      ajouterAuPanier: (item) =>
        set((state) => ({
          panier: [...state.panier, item],
        })),

      // Supprimer un plat par son itemID
      supprimerDuPanier: (id) =>
        set((state) => ({
          panier: state.panier.filter((plat) => plat.itemID !== id),
        })),

      // Vider complètement le panier
      viderPanier: () => set({ panier: [] }),
    }),
    {
      name: "cart-storage", // nom dans localStorage
    }
  )
);
