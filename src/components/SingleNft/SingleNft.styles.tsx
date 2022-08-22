import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  padding: 0 5;
  border: 2px solid;
  border-radius: 15px;
  margin: 5px;
  margin-right: 15px;
  margin-bottom: 20px;
`;

// export const NftImage = styled(Image)
export const Image = styled.img`
  width: 350px;
  height: 250px;
  border-radius: 15px;
  border: 2px solid;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: 500px;
`;
export const Name = styled.div`
  margin-top: 10px;
  font-style: normal;
  color: #ff6f5c;
  font-weight: 400;
  font-size: 16px;
`;

export const OpenseaButton = styled.button`
  border-radius: 6px;
  padding: 5px;
  color: white;
  border: 1px;
  background-color: #ff6f5c;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const Description = styled.div`
  font-style: normal;
  margin-top: 10px;
  font-weight: 400;
  max-width: 320px;
  font-size: 12px;
`;
