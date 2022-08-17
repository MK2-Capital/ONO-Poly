import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #d02d2d;
  position: sticky;
  top: 0;
  height: 90px;
  width: 100%;
  border: solid 1px;
  padding: 5px;
`;

export const Logo = styled.div`
  width: 50%;
  margin-left: 10px;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;

export const AccountInfo = styled.div`
  margin-left: auto;
  width: 50%;
  text-align: end;
`;

export const ConnectWalletButton = styled.div`
  margin-right: 50px;
`;

export const ConnectWalletInfo = styled.div`
  margin-block-end: 50px;
  color: azure;
  width: 40vw;
`;
