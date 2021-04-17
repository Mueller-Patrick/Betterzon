import {Product} from './product';
import {Price} from './price';

export interface Deal {
    product: Product;
    price: Price;
}
