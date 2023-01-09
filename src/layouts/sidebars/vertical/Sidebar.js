import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../logo/Logo";
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  // {
  //   title: "Movies",
  //   href: "/ui/movies",
  //   icon: "bi bi-film",
  // },
  // {
  //   title: "Music",
  //   href: "/ui/songs",
  //   icon: "bi bi-music-note-beamed",
  // },
  // {
  //   title: "Stories",
  //   href: "/ui/stories",
  //   icon: "bi bi-book",
  // },
  {
    title: "Log",
    href: "/",
    icon: "bi bi-calendar-date",
  },
  {
    title: "People",
    href: "/people",
    icon: "bi bi-person-circle",
  },
  // {
  //   title: "About",
  //   href: "/about",
  //   icon: "bi bi-house",
  // },
  // {
  //   title: "Wishlist",
  //   href: "/ui/wishlist",
  //   icon: "bi bi-list-stars",
  // },
  // {
  //   title: "Advent",
  //   href: "/ui/advent",
  //   icon: "bi bi-calendar-heart",
  // },
];

const Sidebar = ({ showMobilemenu }) => {
  let curl = useRouter();
  const location = curl.pathname;

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={showMobilemenu}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link 
                href={navi.href}
                className={
                  location === navi.href
                    ? "text-danger nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
