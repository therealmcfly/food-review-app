const URL = "https://learn.codeit.kr/9546/foods";
const LIMIT = 6;

export async function getFoodList(order, nextCursor, searchValue = "") {
  const query = searchValue
    ? `?limit=${LIMIT}&search=${searchValue}`
    : `?order=${order}&cursor=${nextCursor}&limit=${LIMIT}`;
  const response = await fetch(`${URL}${query}`);
  if (!response.ok) {
    throw new Error("failed to load list");
  }
  const result = await response.json();
  return result;
}
