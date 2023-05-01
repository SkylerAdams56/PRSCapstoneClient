import { Product } from "../product/product.class";
import { Request } from "../request/request.class";
import { RequestService } from "../request/request.service";

export class Requestline{
    id: number = 0;
    quantity: number =0;

    requestId: number = 0;
    request: Request | null = null;

    productId: number = 0;
    product: Product | null = null;
}