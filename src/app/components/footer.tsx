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
              <h3 className="text-sm font-medium text-white">collections</h3>
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
        <div className="mt-12 md:mt-16 xl:mt-0">
          <h3 className="text-sm font-medium text-white">
            Registrate en nuestro newsletter
          </h3>
          <p className="mt-6 text-sm text-gray-200">
            Las mejores fotos de la historicas Universidad de Chile en tu correo.
          </p>
          <form className="mt-2 flex sm:max-w-md">
            <label htmlFor="email-address" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="email-address"
              type="text"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded-md border border-white bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
            />
            <div className="ml-4 flex-shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Registrate
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800 py-10">
        <p className="text-sm text-gray-400">
          Copyright &copy; 2023 Memoria fotografica.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
