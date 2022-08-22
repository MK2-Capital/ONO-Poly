import breakpoints from "@styles/breakpoints";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  max-width: 70vw;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 32.4368px;
  line-height: 34px;
  margin-block-start: 10px;
  margin-left: 35px;
`;
export const NftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  @media ${breakpoints.media_screens.landscape_tablet} {
    flex-direction: row;
    margin-left: 300px;
  }
`;
