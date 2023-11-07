import React from "react";
import * as DropdownComponents from "./Dropdown";

function PetInfo({ intro, setIntro }) {
    
    const updateIntro = (key, value) => {
        const newIntro = intro.split(' ').map(
            section => section.startsWith(`#${key}:`) ? `#${key}:${value}` : section
        ).join(' ');
        setIntro(newIntro);
    };

    return (
        <div>
            <div>
                <label>반려동물</label>
                <DropdownComponents.DropdownSelect
                    value={intro.match(/#pet:(\S*)/)?.[1] || ""}
                    onChange={(e) => updateIntro('pet', e.target.value)}
                    options={DropdownComponents.petOptions}
                />
            </div>
            <div>
                <label>성별</label>
                <DropdownComponents.DropdownSelect
                    value={intro.match(/#gender:(\S*)/)?.[1] || ""}
                    onChange={(e) => updateIntro('gender', e.target.value)}
                    options={DropdownComponents.genderOptions}
                />
            </div>
            <div>
                <label>생일</label>
                <input
                    type="date"
                    value={intro.match(/#birthdate:(\S*)/)?.[1] || ""}
                    onChange={(e) => updateIntro('birthdate', e.target.value)}
                />
            </div>
            <div>
                <label>위치</label>
                <DropdownComponents.DropdownSelect
                    value={intro.match(/#location:(\S*)/)?.[1] || ""}
                    onChange={(e) => updateIntro('location', e.target.value)}
                    options={DropdownComponents.locationOptions}
                />
            </div>
        </div>
    );
}

export default PetInfo;