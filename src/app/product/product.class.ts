import { Vendor } from "../vendor/vendor.class";
import { ProductService } from "./product.service";

export class Product{
    id: number = 0;
    partNbr: string = "";
    name: string ="";
    price: number = 0;
    unit: string = "";
    photoPath: string | null=null;

    vendorId: number =0;
    vendor: Vendor | null = null;
    vendorName!: string;

}