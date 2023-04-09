export enum UserRoles {
 ADMIN = "ADMIN",
 USER = "USER",
 GUEST = "GUEST",
}
export interface Meal {
 readonly _id: string
 price: string 
 title: string
 amunt: string
 description: string
}
export interface Column<T> {
 minWidth?: number;
 align?: 'left';
 header: string
 key: string
 index?: boolean
 render?: (meal: T) => JSX.Element
}