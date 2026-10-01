import Logo from "./Logo";

export default function Footer() {
  return (
    <footer id="contact" className="mt-auto">
      <div className="mx-auto max-w-container px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs font-mono text-xs leading-relaxed text-white/60">
              Organized by Integrated Solutions Co. for Events.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 font-mono text-xs">
            <div className="min-w-0 space-y-3">
              <div className="text-white/40">Contact</div>
              <a
                href="mailto:Info@isc-expo.net"
                className="block text-white/80 hover:text-red"
              >
                Info@isc-expo.net
              </a>
              <a
                href="https://www.isc-expo.net"
                className="block text-white/80 hover:text-red"
              >
                www.isc-expo.net
              </a>
            </div>
            <div className="min-w-0 space-y-3">
              <div className="text-white/40">Location</div>
              <div className="text-white/80">Saudi Arabia · Jeddah</div>
              <div className="text-white/80">Alsalama</div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-stroke pt-8 font-mono text-[10px] text-white/40 md:flex-row md:items-center md:justify-between">
          <span>
            &copy; 2026 Integrated Solutions Co. for Events. License 26/3054.
          </span>
          <span>Jeddah International Motor Show &mdash; 20th Edition</span>
        </div>
      </div>
    </footer>
  );
}
