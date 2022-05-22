const URL = "https://learn.codeit.kr/9546/foods";
const LIMIT = 6;

export async function getFoodList(order, nextCursor) {
  const query = `?order=${order}&cursor=${nextCursor}&limit=${LIMIT}`;
  const response = await fetch(`${URL}${query}`);
  const result = await response.json();
  return result;
}
