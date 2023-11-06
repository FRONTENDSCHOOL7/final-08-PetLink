import React from "react";

export const petOptions = [
    { value: "강아지", label: "강아지" },
    { value: "고양이", label: "고양이" },
];

export const genderOptions = [
    { value: "남아", label: "남아" },
    { value: "여아", label: "여아" },
];

export const locationOptions = [
    { value: "서울", label: "서울" },
    { value: "부산", label: "부산" },
    { value: "대구", label: "대구" },
    { value: "인천", label: "인천" },
    { value: "광주", label: "광주" },
    { value: "대전", label: "대전" },
    { value: "울산", label: "울산" },
    { value: "세종", label: "세종" },
    { value: "경기도", label: "경기도" },
    { value: "충청북도", label: "충청북도" },
    { value: "전라북도", label: "전라북도" },
    { value: "경상북도", label: "경상북도" },
    { value: "경상남도", label: "경상남도" },
    { value: "제주", label: "제주" },
];

export function DropdownSelect({ value, onChange, options, placeholder = "선택하세요" }) {
    return (
        <select value={value} onChange={onChange}>
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
                <option value={option.value} key={index}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
