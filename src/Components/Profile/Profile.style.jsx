import styled from 'styled-components';
import uploadIcon from '../../assets/image/icon-img-button.png';

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ProfileImage = styled.img`
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    margin: 20px;
    border: 1px solid var(--DBDBDB, #DBDBDB);
    background: url(<path-to-image>), lightgray 50% / cover no-repeat;

`;

export const ProfileUsername = styled.h2`
    margin: 5px 0;
    font-size: 20px;
`;

export const ProfileAccountname = styled.h3`
    margin: 10px 0;
    font-size: 12px;
    color: #767676;
`;

export const ProfilePet = styled.div`
    margin: 5px 0;
    font-size: 15px;
    color: #767676;
`;

export const GenderIcon = styled.span`
    font-size: 17px;
    font-weight: bold;
    color: ${props => props.gender === '남아' ? 'blue' : props.gender === '여아' ? 'red' : 'black'};
`;

export const ProfileEmail = styled.p`
    margin: 10px 0;
    font-size: 18px;
    color: grey;
`;

export const ProfileFollow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 200px;
    margin: 20px 0;
    font-size: 18px;
`;

export const ProfileIntro = styled.p`
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    color : #767676;
`;

export const FollowGroup = styled.div`
    
    margin: 0 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 150px;
`;

export const FollowCount = styled.span`
    font-size: 30px;
    font-weight: bold;
    display: flex;
`;

export const FollowLabel = styled.span`
    font-size: 12px;
    color: grey;
`;

export const FollowInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
`;

export const ProfileImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BtnGroup = styled.div`
    display: flex;
    align-items: center;
    margin-right: 30px;
`

export const Button = styled.button`
    border-color: var(--dbdbdb);
    position: relative;
    height: 34px;
    padding: 5px 20px;
    color: #767676;
    border: 1px solid;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
    margin-left: 10px;


    &:hover {
        background-color: #004e98;
        color: #ffffff;
    }
`;

export const ImageWrap = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    margin-top: 50px;
    `;

    export const ImageUpbtn = styled.label`
    position: absolute;
    bottom: 45px;
    right: 138px;
    width: 30px;
    height: 30px;
    background-image: url(${uploadIcon});
    background-size: cover;
    cursor: pointer;
    z-index: 10;

    input[type="file"] {
        display: none;
    }

    @media (min-width: 768px) {
        bottom: 45px;
        right: 326px;
    }
    `;


export const Title = styled.label`
    display: flex;
    justify-content: center;
    font-size: 24px;
    color: black;
    padding-top: 20px
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    label {
        margin-bottom: 10px;
    }

    input, textarea, select {
        padding: 10px;
        font-size: 16px;
    }
`;

export const StyledInput = styled.input`
    border: none;
    border-bottom: 1px solid grey;
    width: 100%;
    font-size: 16px;

    &:focus {
        border-bottom: 1px solid #6C9BD1;
    }
`;

export const Styledlabel = styled.label`
    color: '#767676';
    font-Size: 12px;
`

export const Styledpetinfo = styled.label`
    color: black; 
    font-Size: 15px;
`

export const SubBtn = styled.button`
    border-color: var(--dbdbdb);
    position: relative;
    height: 34px;
    padding: 5px 20px;
    color: #767676;
    border: 1px solid;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 21px;
    margin-left: auto;
    margin-right: auto;
    display: block;

    &:hover {
        background-color: #004e98;
        color: #ffffff;
    }
`;

export const EditWrap = styled.div`
margin: 20px;
`
export const PetInfo = styled.div`
margin: 20px;
`

