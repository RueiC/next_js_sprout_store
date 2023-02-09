export const getBackendImages: string = `
*[_type == "backendImages"] {
  image {
    asset->{
      url
    }
  },
}
`;

export const getComments = (productId: string): string => {
  const query = `
    *[_type == "product" && _id == "${productId}"] {
      comments[] {
        _key,
        comment,
        rating,
        createdAt,
        postedBy->{
          _id,
          _type,
          userName,
          image
        },
      }
    }
  `;
  return query;
};

export const getProducts: string = `
*[_type == "product"] {
  image {
    asset->{
      url
    }
  },
  name,
  _id,
  slug,
  price,
  amount,
  isDiscount,
  discountPrice,
  qty,
  rating
}
`;

export const getProductPaths: string = `
*[_type == "product"] {
  _id,
}
`;

export const getDiscountProducts: string = `
*[_type == "product" && isDiscount == true] {
  image {
    asset->{
      url
    }
  },
  name,
  _id,
  slug,
  price,
  amount,
  isDiscount,
  discountPrice,
  rating
}
`;

export const getTopTenNewProducts: string = `
*[_type == "product"] | order(_createdAt) {
  image {
    asset->{
      url
    }
  },
  name,
  _id,
  slug,
  price,
  amount,
  isDiscount,
  discountPrice,
  rating
}[0...10]
`;

export const getProduct = (productId: string): string => {
  const query = `
    *[_type == "product" && _id == '${productId}']{
        image {
          asset->{
            url
          }
        },
        name,
        _id,
        slug,
        brand,
        price,
        details,
        amount,
        country,
        isDiscount,
        discountPrice,
        qty,
        rating
    }`;
  return query;
};

export const filteredByOptions = (
  countryOption: string[],
  amountOption: string,
  sortOption: string,
  searchOption: string,
): string => {
  const handleSort = (sortOption: string): string => {
    switch (sortOption) {
      case '價格由高到低':
        return `| order(price desc)`;

      case '價格由低到高':
        return `| order(price asc)`;

      case '由新到舊':
        return `| order(_createdAt desc)`;

      case '由舊到新':
        return `| order(_createdAt asc)`;

      default:
        return '';
    }
  };

  const handleSearch = (searchOption: string): string => {
    return searchOption !== '' ? `&& name match '${searchOption}'` : '';
  };

  const handleCountryOpt = (countryOption: string[]): string => {
    if (countryOption.includes('不限')) {
      return '';
    } else {
      const newCountryOpt = JSON.stringify(countryOption);

      return `&& country in ${newCountryOpt}`;
    }
  };

  const filteredQuery = `${handleCountryOpt(
    countryOption,
  )} ${amountOption} ${handleSearch(searchOption)}`;

  const query: string = `
    *[_type == "product" ${filteredQuery}] ${handleSort(sortOption)}{
      image {
        asset->{
          url
        }
      },
      name,
      _id,
      brand,
      slug,
      price,
      details,
      amount,
      country,
      isDiscount,
      discountPrice,
      rating
    }`;

  return query;
};
