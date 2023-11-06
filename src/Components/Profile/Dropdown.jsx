import React from "react";

export const petOptions = [
    { value: "", label: "선택안함" },
    { value: "강아지", label: "강아지" },
    { value: "고양이", label: "고양이" },
];

export const genderOptions = [
    { value: "", label: "선택안함" },
    { value: "남아", label: "남아" },
    { value: "여아", label: "여아" },
];

export const locationOptions = [
    { value: "", label: "선택안함" },
    { value: "서울", label: "서울" },
    { value: "부산", label: "부산" },
];

export function DropdownSelect({ value, onChange, options }) {
    return (
        <select value={value} onChange={onChange}>
            {/* "선택안함" 기본값 */}
            {options.map((option, index) => (
                <option value={option.value} key={index}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
