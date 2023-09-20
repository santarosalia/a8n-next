import { ReactNode } from "react";

export interface Plan {
    title: string,
    subtitle: string,
    access: string[],
    buttonText: string,
    price?: string,
    href: string,
    img: string,
    children?: ReactNode
}