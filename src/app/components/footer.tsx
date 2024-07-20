type FooterProps = {
  campus: Array<{
    name: string;
    href: string;
  }>;
  collections: Array<{
    name: string;
    href: string;
  }>;
  connect: Array<{
    name: string;
    href: string;
  }>;
};

const Footer: React.FC<FooterProps> = ({ campus, collections, connect }) => (
  <footer aria-labelledby="footer-heading" className="bg-mainmf-100">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="grid grid-cols-2 gap-8 xl:col-span-2">
          <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            <div>
              <h3 className="text-sm font-medium text-white">Campus</h3>
              <ul role="list" className="mt-6 space-y-6">
                {campus.map((item) => (
                  <li key={item.name} className="text-sm">
                    <a
                      href={item.href}
                      className="text-gray-200 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Colecciones</h3>
              <ul role="list" className="mt-6 space-y-6">
                {collections.map((item) => (
                  <li key={item.name} className="text-sm">
                    <a
                      href={item.href}
                      className="text-gray-200 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-12 md:grid md:grid-cols-1 md:gap-8 md:space-y-0">
            <div>
              <h3 className="text-sm font-medium text-white">Contáctanos</h3>
              <ul role="list" className="mt-6 space-y-6">
                {connect.map((item) => (
                  <li key={item.name} className="text-sm">
                    <a
                      href={item.href}
                      className="text-gray-200 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-10">
        <p className="text-sm text-gray-400">
          Copyright &copy; 2024 Biblioteca Central.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
