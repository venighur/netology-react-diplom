export const getProducts = (categoryId: number | null, searchValue: string, offsetValue: number) => {

  const category = !categoryId ? '' :`?categoryId=${categoryId}`;
  const search = !searchValue ? '' : `${!category ? '?' : '&'}q=${searchValue}`;
  const offset = !offsetValue ? '' : `${!category && !search ? '?' : '&'}offset=${offsetValue}`;

  return fetch(process.env.REACT_APP_CATALOG_URL + category + search + offset)
    .then((response) => response.json());
}
