import styled from "styled-components";

export const NavLogoContainer = styled.div`
  display: flex;
  font-size: 1.2em;
  font-family: "Orbitron";
  a {
    white-space: nowrap;
    text-decoration: none;
    color: #fff;
    overflow: hidden;
    font-weight: 500;
    @keyframes typing {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
  }
`;
