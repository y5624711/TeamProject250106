import React from "react";

function PartnerAddComp(props) {
  return (
    <div>
      <h2>협력사 등록</h2>
      <div>
        <ul>
          <li>
            <label htmlFor={"partnerName"}>업체명</label>
            <input type="text" id={"partnerName"} required />
          </li>
          <li>
            <label htmlFor={"post"}>우편 번호</label>
            <input type="text" id={"post"} />
          </li>
          <li>
            <label htmlFor={"productCode"}>품목 코드</label>
            <input type="text" id={"post"} />
          </li>
          <li>
            <label htmlFor={"post"}>우편 번호</label>
            <input type="text" id={"post"} />
          </li>
          <li>
            <label htmlFor={"address"}>주소</label>
            <input type="text" id={"address"} />
          </li>
          <li>
            <label htmlFor={"details"}>상세 주소</label>
            <input type="text" id={"details"} />
          </li>
          <li>
            <label htmlFor={"city1"}>광역시도</label>
            <input type="text" id={"post"} />
          </li>
          <li>
            <label htmlFor={"city2"}>시군</label>
            <input type="text" id={"post"} />
          </li>
          <li>
            <label htmlFor={"representative"}>대표자</label>
            <input type="text" id={"representative"} />
          </li>
          <li>
            <label htmlFor={"tel"}>전화번호</label>
            <input type="text" id={"tel"} />
          </li>
          <li>
            <label htmlFor={"fax"}>팩스</label>
            <input type="text" id={"fax"} />
          </li>
          <li>
            <label htmlFor={"active"}>사용 여부</label>
            <input type="boolean" id={"active"} />
          </li>
          <li>
            <label htmlFor={"note"}>비고</label>
            <input type="text" id={"note"} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PartnerAddComp;
