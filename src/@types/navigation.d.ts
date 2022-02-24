export type ProductNavitagionProps = {
  id?: string;
};

export type OrderNavitagionProps = {
  id: string;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      product: ProductNavitagionProps;
      order: OrderNavitagionProps;
      orders: undefined;
    }
  }
}
