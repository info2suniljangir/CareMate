import { Ubuntu, Outfit, Roboto } from "next/font/google";



export const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: "700"
});

export const roboto = Roboto({
    subsets: ["latin"],
    weight: ["700", "500", "400"]
});

export const outfit = Outfit({
    subsets: ["latin"],
    weight: ["700", "500", "400", "600"]
});

