import LogoClear from "../../assets/images/logos/LogoNoBackground.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
        <Image src={LogoClear} alt="logo" width='190' />
    </Link>
  );
};

export default Logo;
