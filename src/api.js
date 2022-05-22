export async function getFoodList() {
  const response = await fetch("https://learn.codeit.kr/9546/foods");
  const result = await response.json();
  return result;
}
