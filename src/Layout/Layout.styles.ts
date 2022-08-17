import styled from "styled-components";
import breakpoints from "@styles/breakpoints";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainContainer = styled.main`
  counter-reset: section 0;
  margin: 0px auto;
  width: 100%;
  max-width: 1500px;
  min-height: 100vh;
  padding: 0px 30px;
  @media ${breakpoints.media_screens.portrait_tablet} {
    padding: 0px 50px;
  }
  @media ${breakpoints.media_screens.landscape_tablet} {
    padding: 0px 100px;
  }
  @media ${breakpoints.media_screens.small_desktop} {
    padding: 0px 80px;
  }
`;
