import React, { useState } from "react";
import axios from "axios";

export default function SellerAuthentication() {
  const [businessNumber, setBusinessNumber] = useState<string>("");
  const [representativeName, setRepresentativeName] = useState<string>("");
  const [openingDate, setOpeningDate] = useState<string>("");
  const [corporateNumber, setCorporateNumber] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [isBusinessNumberDuplicated, setIsBusinessNumberDuplicated] =
    useState<boolean>(false);
  const [isValidSeller, setIsValidSeller] = useState<boolean | null>(null);

  const isValidBusinessNumber = (value: string): boolean => {
    const regex = /^\d{10}$/;
    return regex.test(value);
  };

  const isValidOpeningDate = (value: string): boolean => {
    const regex = /^\d{8}$/;
    return regex.test(value);
  };

  const isValidCorporateNumber = (value: string): boolean => {
    const regex = /^\d{13}$/;
    return regex.test(value);
  };

  const handleCheckBusinessNumber = () => {
    axios
      .get(`http://your-api-url.com/seller/business-number/${businessNumber}`)
      .then((response) => {
        setIsBusinessNumberDuplicated(response.data.duplicated);
      })
      .catch((error) => {
        console.error("사업자등록번호 조회 오류:", error);
      });
  };

  const handleSearchSeller = () => {
    // Call your API to check if the seller information exists
    axios
      .get(`http://your-api-url.com/seller/${businessNumber}`)
      .then((response) => {
        setIsValidSeller(response.data.valid);
      })
      .catch((error) => {
        console.error("판매자 정보 조회 오류:", error);
      });
  };

  return (
    <div className="page">
      <div className="titleWrap">Seller Authentication</div>
      <div className="contentWrap">
        <div style={{ marginTop: "26px" }} className="inputTitle">
          사업자등록번호
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="사업자등록번호를 입력하세요 (예: 1234567890)"
            value={businessNumber}
            onChange={(e) => setBusinessNumber(e.target.value.replace("-", ""))}
          />
          <button onClick={handleCheckBusinessNumber}>중복 확인</button>
        </div>
        {isBusinessNumberDuplicated && (
          <div className="errorMessageWrap">중복된 사업자등록번호입니다.</div>
        )}

        <div style={{ marginTop: "26px" }} className="inputTitle">
          대표자성명
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="대표자성명을 입력하세요 (예: John Doe)"
            value={representativeName}
            onChange={(e) => setRepresentativeName(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "26px" }} className="inputTitle">
          개업일자
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="개업일자를 입력하세요 (예: 20230101)"
            value={openingDate}
            onChange={(e) => setOpeningDate(e.target.value.replace("-", ""))}
          />
        </div>
        {!isValidOpeningDate(openingDate) && openingDate.length > 0 && (
          <div className="errorMessageWrap">올바른 개업일자 형식이 아닙니다.</div>
        )}

        <div style={{ marginTop: "26px" }} className="inputTitle">
          법인등록번호
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="법인등록번호를 입력하세요 (예: 1234567890123)"
            value={corporateNumber}
            onChange={(e) => setCorporateNumber(e.target.value.replace("-", ""))}
          />
        </div>
        {!isValidCorporateNumber(corporateNumber) && corporateNumber.length > 0 && (
          <div className="errorMessageWrap">올바른 법인등록번호 형식이 아닙니다.</div>
        )}

        <div style={{ marginTop: "26px" }} className="inputTitle">
          상호명
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="상호명을 입력하세요 (예: ABC Corporation)"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <button onClick={handleSearchSeller}>조회</button>
        {isValidSeller === true && (
          <div>유효한 사업자 정보입니다.</div>
        )}
        {isValidSeller === false && (
          <div>유효하지 않은 사업자 정보입니다.</div>
        )}
        {isValidSeller === null && (
          <div>사업자 정보를 조회해주세요.</div>
        )}
      </div>
    </div>
  );
}
