export interface Product {
    product_id: number;
    asin: string;
    is_active: boolean;
    name: string;
    short_description: string;
    long_description: string;
    image_guid: string;
    date_added: Date;
    last_modified: Date;
    manufacturer_id: number;
    selling_rank: string;
    category_id: number;
}
