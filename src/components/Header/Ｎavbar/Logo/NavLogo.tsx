import Link from "next/link";
import { NavLogoContainer } from "./NavLogo.styles";
import Image from "next/image";

function NavLogo() {
  return (
    <NavLogoContainer>
      <Link href="#">
        <a aria-label="home" rel="noreferrer noopener">
          <Image src={"/assets/logo/logo_crop.jpeg"} width={60} height={60} />
        </a>
      </Link>
    </NavLogoContainer>
  );
}

export default NavLogo;
