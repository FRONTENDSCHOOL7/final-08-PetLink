import styled from "styled-components";

export const ProfileImage = styled.img`
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
    border: 1px solid var(--DBDBDB, #DBDBDB);
    background: url(<path-to-image>), lightgray 50%
`;

export const Errormessage = styled.div`
    margin-top:5px;
    font-size: 14px;
    color: red;
`