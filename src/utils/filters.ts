/**
 * Filters a list of stocks based on an array of filter criteria.
 * @param stocks - The array of stock objects to filter.
 * @param filters - The filter criteria array.
 * @returns The filtered array of stocks.
 */
export function applyFilters<T extends Record<string, any>>(
  stocks: T[],
  filters: { metric: string; operator: string; value: number | undefined }[]
): T[] {
  return stocks.filter((stock) =>
    filters.every((f) => {
      if (!f.metric || !f.operator || f.value === undefined || f.value === null)
        return true;
      const stockValue = Number(stock[f.metric as keyof T]);
      const filterValue = Number(f.value);
      switch (f.operator) {
        case ">=":
          return stockValue >= filterValue;
        case "<=":
          return stockValue <= filterValue;
        case ">":
          return stockValue > filterValue;
        case "<":
          return stockValue < filterValue;
        case "=":
          return stockValue === filterValue;
        default:
          return true;
      }
    })
  );
}
