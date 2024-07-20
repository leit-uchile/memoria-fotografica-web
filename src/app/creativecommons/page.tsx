import { CheckIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "Atribución (CC BY)",
    description:
      "Permite a otros copiar, distribuir, mostrar y ejecutar el trabajo y las obras derivadas, incluso con fines comerciales, siempre que se dé crédito al autor original de la manera especificada por estos.",
    imgSrc: "/assets/CC/CCBY.svg",
  },
  {
    name: "Atribución-CompartirIgual (CC BY-SA)",
    description:
      "Permite a otros copiar, distribuir, mostrar y ejecutar el trabajo y las obras derivadas, incluso con fines comerciales, siempre que cualquier obra derivada se distribuya bajo la misma licencia.",
    imgSrc: "/assets/CC/CCBYSA.svg",
  },
  {
    name: "Atribución-SinDerivadas (CC BY-ND)",
    description:
      "Permite la redistribución, comercial y no comercial, siempre que el trabajo se reproduzca sin cambios y en su totalidad, con crédito al autor original.",
    imgSrc: "/assets/CC/CCBYND.svg",
  },
  {
    name: "Atribución-NoComercial (CC BY-NC)",
    description:
      "Permite a otros copiar, distribuir, mostrar y ejecutar el trabajo y las obras derivadas solo con fines no comerciales, y deben otorgarse créditos al autor original.",
    imgSrc: "/assets/CC/CCBYNC.svg",
  },
  {
    name: "Atribución-NoComercial-CompartirIgual (CC BY-NC-SA)",
    description:
      "Permite a otros copiar, distribuir, mostrar y ejecutar el trabajo y las obras derivadas solo con fines no comerciales, siempre que cualquier obra derivada se distribuya bajo la misma licencia.",
    imgSrc: "/assets/CC/CCBYNCSA.svg",
  },
  {
    name: "Atribución-NoComercial-SinDerivadas (CC BY-NC-ND)",
    description:
      "La licencia más restrictiva, solo permite la descarga de las obras y compartirlas con otros siempre que se reconozca su autoría y no se utilicen con fines comerciales.",
    imgSrc: "/assets/CC/CCBYNCND.svg",
  },
];

export default function CreativeCommons() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-mainmf-600">
              Derechos de autor
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Licencias de tipo Creative Commons
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600 text-justify">
              Creative Commons constituye un innovador proyecto internacional
              que tiene por objetivo fortalecer a creadores y creadoras, para
              que sean quienes definan los términos en que sus obras pueden ser
              usadas, qué derechos desean entregar y en qué condiciones lo
              harán.
              <br></br>
              Si el paradigma del sistema tradicional del derecho de autor es
              “Todos los derechos reservados”, para las licencias CC es “Algunos
              derechos reservados”. Si en el sistema del derecho de autor el
              principio es que toda utilización de una obra debe tener un
              permiso expreso del titular de los derechos de autor, para las
              licencias CC el principio es el de la libertad creativa.
            </p>
          </div>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="font-semibold text-gray-900">
                  <CheckIcon
                    className="absolute left-0 top-1 h-5 w-5 text-mainmf-500"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-2">{feature.description}</dd>
                <dd className="mt-2">
                  <img
                    src={feature.imgSrc}
                    alt={feature.name}
                  />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
