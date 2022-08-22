import breakpoints from "@styles/breakpoints";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  max-width: 100vw;
`;

export const Title = styled.div`
  font-style: bold;
  font-weight: 700;
  font-size: 40px;
  line-height: 34px;
  margin-block-start: 10px;
  margin-left: 40px;
`;
export const NftContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  @media ${breakpoints.media_screens.landscape_tablet} {
    flex-wrap: wrap;
    margin-left: 20 px;
  }
`;
