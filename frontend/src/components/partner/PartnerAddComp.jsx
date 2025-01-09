import React from "react";

function PartnerAddComp(props) {
  return (
    <div>
      <h2>협력사 등록</h2>
      <div>
        <ul>
          <li>
            <label>업체명</label>
            <input type="text" id={""} />
          </li>
          <li>
            <label>우편 번호</label>
            <input type="text" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PartnerAddComp;
