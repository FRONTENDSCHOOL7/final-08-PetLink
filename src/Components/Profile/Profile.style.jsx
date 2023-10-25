import styled from 'styled-components';

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
`;

export const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
`;

export const ProfileUsername = styled.h2`
    margin: 10px 0;
    font-size: 28px;
`;

export const ProfileAccountname = styled.h3`
    margin: 10px 0;
    font-size: 15px;
    color: #767676;
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
    margin-top: 20px;
    font-size: 18px;
    text-align: center;
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
    disply: fexld;
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

export const EditProfileButton = styled.button`
    padding: 5px 20px;
    color: #767676;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;

        background-color: #ffffff;
        border: 1px solid;
        border-color: var(--dbdbdb);
        height: 34px;
        position: relative;

    &:hover {
        background-color: #2980b9;
    }
`;