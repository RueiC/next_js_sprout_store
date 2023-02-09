/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SANITY_TOKEN: string;
      NEXT_PUBLIC_GOOGLE_API_TOKEN: string;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      NEXT_PUBLIC_STRIPE_SECRET_KEY: string;
      NEXT_PUBLIC_BASE_URL: string;
    }
  }
}

export type SanityImage = {
  image: {
    asset: {
      url: string;
    };
  };
};

export type User = {
  _id: string;
  _type: string;
  userName: string;
  image: string;
};

export type CommentType = {
  _key: string;
  postedBy: User;
  comment: string;
  createdAt: string;
  rating: number;
};

export type Product = {
  _id: string;
  name: string;
  image: {
    asset: {
      url: string;
    };
  };
  slug: {
    _type: string;
    current: string;
  };
  amount: number;
  isDiscount: boolean;
  price: number;
  discountPrice: number | null;
  qty: number;
  rating: number;
};

export interface ProductDetail extends Product {
  brand: string;
  details: string;
  country: string;
  // comments: CommentType[] | null;
}

export interface FormValues {
  firstname: string;
  lastname: string;
  phoneNum: string;
  email: string;
  country: string;
  city: string;
  street: string;
  postalCode: string;
  packageType: string;
  transportationOps: string;
}

export interface Amount {
  name: string;
  value: string;
}
