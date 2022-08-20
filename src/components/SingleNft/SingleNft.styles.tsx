import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 400px;
  padding: 10px;
  border: 1px solid;
  border-radius: 10px;
  margin: 5px;
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: 500px;
`;
export const Name = styled.div`
  margin-top: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
`;

export const OpenseaButton = styled.button`
  border-radius: 6px;
  padding: 5px;
  color: white;
  border: 1px;
  background-color: #d02d2d;
`;

export const Description = styled.div`
  font-style: normal;
  margin-top: 10px;
  font-weight: 400;
  max-width: 250px;
  font-size: 12px;
`;
