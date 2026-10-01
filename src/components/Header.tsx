import Logo from "./Logo";
import Button from "./Button";

const links = [
  { label: "About", href: "#about" },
  { label: "Schedule", href: "#schedule" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stroke bg-dark/90 backdrop-blur">
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-mono md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/80 transition-colors hover:text-red"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button href="#register" className="hidden md:inline-flex">
          Book Your Spot
        </Button>
      </div>
    </header>
  );
}
