import React from "react";
import { Container, MainContainer } from "./Layout.styles";

const Layout: React.FC = ({ children }) => {
  return (
    <Container id="wrapper">
      <MainContainer>{children}</MainContainer>
    </Container>
  );
};

export default Layout;
