import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  padding: 10px;
  border: 2px solid;
  border-radius: 10px;
  margin: 5px;
  margin-right: 15px;
`;

// export const NftImage = styled(Image)
export const Image = styled.img`
  width: 275px;
  height: 250px;
  border-radius: 10px;
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
`;

export const Description = styled.div`
  font-style: normal;
  margin-top: 10px;
  font-weight: 400;
  max-width: 300px;
  font-size: 12px;
`;
