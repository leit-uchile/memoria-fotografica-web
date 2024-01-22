import Footer from "./components/footer";
import Navigation from "./components/nav";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const categories = [
  {
    name: "Casa Central",
    href: "/gallery?category=Casa Central",
    imageSrc: "https://www.duna.cl/media/2015/08/universidad-de-chile.jpg",
    imageAlt: "Universidad de Chile",
  },
  {
    name: "Tecnologia",
    href: "/gallery?category=Tecnologia",
    imageSrc: "https://media.elmostrador.cl/2016/06/fut-1-700x434.jpg",
    imageAlt: "Universidad de Chile",
  },
  {
    name: "Deportes",
    href: "/gallery?category=Deportes",
    imageSrc:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.deporteazul.cl%2Fmain_wp%2Fwp-content%2Fuploads%2F2020%2F08%2FWhatsApp-Image-2020-08-12-at-12.26.51.jpeg&f=1&nofb=1&ipt=7134369cfd15784b8aaaef7ff24e79d636fc9d68e7606a66b93fbcc3730523a7&ipo=images",
    imageAlt: "Universidad de Chile",
  },
  {
    name: "Ciencia",
    href: "/gallery?category=Ciencia",
    imageSrc:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Ynl7g-2_5flHOlLTEvWgTQHaJ4%26pid%3DApi&f=1&ipt=9dc46857d0a15fa6b5fafd13a349d502963cda3aab075368999eb17fb8740ca7&ipo=images",
    imageAlt: "Universidad de Chile",
  },
];

const collections = [
  {
    name: "Andres Bello",
    href: "/collection/0",
    imageSrc:
      "https://revistasantiago.cl/cms/wp-content/uploads/2020/08/andresbello-diarioavance.jpg",
    imageAlt: "Imagen de Andréss Bello",
    description:
      "Retrato de Andrés Bello, primer rector de la Universidad de Chile.",
  },
  {
    name: "Nicanor Parra",
    href: "collection/1",
    imageSrc:
      "https://www.poblanerias.com/wp-content/archivos/2018/01/0123-Nicanor-Parra.jpg",
    imageAlt: "Fotografia en blanco y negro de Nicanor Parra",
    description:
      "Profesor Emerito, antipoeta, Nicanor Parra y su historia con la casa de bello.",
  },
  {
    name: "U de Chile en los panamericanos",
    href: "collection/2",
    imageSrc:
      "https://uchile.cl/.imaging/stk/uchile/PEC/dam/imagenes/Uchile/VEXCOM/Galerias-foto-2023/Octubre-2023/Galeria%20Desayuno%20deportistas%20panamericanos.zip/Galeria-Desayuno-deportistas-panamericanos/Panamericano-027-L.jpg/jcr:content/Panamericano-027-L.jpg.jpg",
    imageAlt: "",
    description:
      "Acompaña a la U. de Chile en los Juegos Panamericanos, explorando el espíritu deportivo, la dedicación de los atletas y los logros en el escenario internacional",
  },
];

const navigation = {
  categories: [
    {
      name: "Categorias",
      featured: categories,
    },
    {
      name: "Colecciones",
      featured: collections,
    },
  ],
  pages: [
    { name: "Nosotros", href: "/about" },
    { name: "Aporta", href: "/donate" },
  ],
};

const footerNavigation = {
  campus: [
    { name: "Beauchef", href: "#" },
    { name: "Andrés Bello", href: "#" },
    { name: "Campus Sur", href: "#" },
    { name: "Juan Gomez Millas", href: "#" },
    { name: "Medicina", href: "#" },
  ],
  collections: [
    { name: "Colecciones de autor", href: "#" },
    { name: "Material de estudiantes", href: "#" },
    { name: "Prensa", href: "#" },
    { name: "UChile y sociedad", href: "#" },
    { name: "Restauraciones", href: "#" },
  ],
  connect: [
    { name: "Nosotros", href: "#" },
    { name: "Biblioteca Central", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Términos y condiciones", href: "/termsofservice" },
  ],
};

export const metadata = {
  title: "Memoria Fotográfica",
  description: "Universidad de Chile - FCFM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className + " bg-white"}>
        <Navigation {...navigation} />
        {children}
        <Footer {...footerNavigation} />
      </body>
    </html>
  );
}
