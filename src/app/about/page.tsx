const active_members = [
  {
    imageUrl:
      "/assets/profiles/20248254_1604088656270906_1312142107271353514_o.jpg",
    altText: "Foto de perfil Darío Palma",
    name: "Darío Palma",
    role: "Egresado de Doble título e Ingeniería Civil en Computación",
  },
  {
    imageUrl: "/assets/profiles/isaias.jpg",
    altText: "Foto de perfil Isaías Venegas",
    name: "Isaías Venegas",
    role: "Estudiante de Doble título e Ingeniería Civil en Computación",
  },
  {
    imageUrl:
      "https://avatars1.githubusercontent.com/u/26554728?s=400&u=30a71e6019159edbd3f720b234796319064bef95&v=4",
    altText: "Foto de perfil Darío Cáceres",
    name: "Darío Cáceres",
    role: "Estudiante de Ingeniería Civil en Computación",
  },
  {
    imageUrl: "/assets/profiles/jastorga.png",
    altText: "Foto de perfil José Astorga",
    name: "José Astorga",
    role: "Estudiante de Ingeniería Civil en Computación",
  },
  {
    imageUrl: "/assets/profiles/photo_2020-10-24_11-41-25.jpg",
    altText: "Foto de perfil Alejandra Alarcón",
    name: "Alejandra Alarcón",
    role: "Estudiante de Ingeniería Civil en Computación",
  },
  {
    imageUrl: "/assets/profiles/joaquin.jpg",
    altText: "Foto de perfil Joaquín Díaz",
    name: "Joaquín Díaz",
    role: "Estudiante de Ingeniería Civil en Computación",
  },
  {
    imageUrl: "/assets/profiles/vicente.jpg",
    altText: "Foto de perfil Vicente Díaz",
    name: "Vicente Díaz",
    role: "Estudiante de Ingeniería Civil en Computación",
  },
];

const former_members = [
  {
    imageUrl: "/assets/profiles/victoria.jpg",
    altText: "Foto de perfil Victoria Bollo",
    name: "Victoria Bollo",
    role: "Estudiante de  Magíster en Astronomía",
  },
  {
    imageUrl: "/assets/profiles/fefa.jpg",
    altText: "Foto de perfil Fernanda Carvajal",
    name: "Fernanda Carvajal",
    role: "Egresada de Derecho, Licenciada en leyes",
  },
  {
    imageUrl: "/assets/profiles/natalia.jpg",
    altText: "Foto de perfil Natalia Durán",
    name: "Natalia Durán",
    role: "Estudiante de Enfermería, Ex estudiante de Ingeniería",
  },
];

const colaborators_photos = [
  {
    header: "Sostenedora",
    imageUrl:
      "https://ucampus.uchile.cl/d/r/usuario/9d/9d4438c4ec735ef3b745b3b369a43216/perfil/3ee573197dde61aad94aa26359acb3d6.jpg",
    altText: "Foto de perfil Rosa Leal",
    name: "Rosa Leal",
    role: "Directora de la Biblioteca Central FCFM",
  },
  {
    header: "Organización",
    imageUrl: "/assets/profiles/badas.jpg",
    altText: "Foto de perfil Nicolás Varas",
    name: "Nicolás Varas",
    role: "Ingeniero Civil en Computación, Ex miembro CEI",
  },
  {
    header: "Diseño",
    imageUrl: "/assets/profiles/rafael.jpg",
    altText: "Foto de perfil Rafael Castillo",
    name: "Rafael Castillo",
    role: "Diseñador y Coordinador de Servicios Bibliográficos Electrónicos",
  },
  {
    header: "Sistemas",
    imageUrl:
      "https://ucampus.uchile.cl/d/r/usuario/71/71c114dba2c0fe52dbf6ae0d6ab8c077/perfil/cb871295eba79e33262194660f10d537.jpg",
    altText: "Jorge Concha",
    name: "Jorge Concha",
    role: "Ingeniero de Sistemas del Centro de Computación CEC.",
  },
  {
    header: "Sistemas",
    imageUrl:
      "https://ucampus.uchile.cl/d/r/usuario/0c/0c4d8c861f5ba6092fb87f3a1f37a5b7/perfil/239860710ecb1f95193ed0d183db3904.jpg",
    altText: "Fernando Quezada",
    name: "Fernando Quezada",
    role: "Soporte y Webmaster de la Biblioteca Central",
  },
];

export default function About() {
  return (
    <div className="bg-white py-24 sm:py-32 space-y-10">
      

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Gestión y Colaboradores
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Funcionarios de la Biblioteca Central de la FCFM y colaboradores.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {colaborators_photos.map((person) => (
            <li key={person.name}>
              <img
                className="mx-auto h-24 w-24 rounded-full"
                src={person.imageUrl}
                alt=""
              />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {person.name}
              </h3>
              <p className="text-sm leading-6 text-gray-600">{person.role}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Equipo de trabajo
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Somos un grupo de estudiantes y ex estudiantes de la Universidad de
            Chile, que busca rescatar y difundir la historia de nuestra
            universidad a través de la fotografía.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {([...active_members, ...former_members]).map((person) => (
            <li key={person.name}>
              <img
                className="mx-auto h-24 w-24 rounded-full"
                src={person.imageUrl}
                alt=""
              />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {person.name}
              </h3>
              <p className="text-sm leading-6 text-gray-600">{person.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
