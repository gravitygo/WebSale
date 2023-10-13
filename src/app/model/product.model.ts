export interface Product{
    "product_option": ProductOption
    "cost_amount": number
}

export interface ProductList{
    "product_code": string,
    "product_name": string,
    "product_list": Product[]
}

export interface DataReturn{
    amount: number;
    name: string;
    product_option: ProductOption;
}

export interface ProductOption {
    product_guid: string;
    unit_name: string;
}

export interface Cart{
    [guid: string]: DataReturn
}
  