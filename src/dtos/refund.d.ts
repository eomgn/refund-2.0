type RefundsAPIResponse = {
  id: string;
  userId: string;
  name: string;
  amount: number;
  category: CategoriesAPIEnum;
  filename: string;
  user: {
    name: string;
  };
};

type RefundsPaginationAPIResponse = {
  refunds: RefundsAPIResponse[];

  page: number;
  perPage: number;
  totalPages: number;
  totalRecords: number;
};
