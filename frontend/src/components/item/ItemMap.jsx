// 한글 품목 구분과 품목 코드 매핑
const itemMap = {
  POS: "pos",
  전자레인지: "mic",
  라면제조기: "ram",
  냉장고: "ref",
  냉동실: "fre",
  온장고: "war",
  선반: "she",
  "결제 단말기": "pay",
  프린터기: "pri",
  CCTV: "ctv",
  커피머신: "cof",
  튀김기: "fri",
};

export const getItemCode = (itemType) => {
  return itemMap[itemType] || "";
};
