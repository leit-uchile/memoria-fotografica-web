const faqs = [
  {
    question:
      "¿Cómo puedo contribuir con fotografías a la plataforma de memoria fotográfica?",
    answer:
      "Puedes contribuir enviando tus fotografías históricas a través del vínculo 'Aporta' en la barra de arriba. Un miembro del equipo de la biblioteca revisará y curará el contenido antes de ser publicado.",
  },
  {
    question:
      "¿Cuáles son los criterios para que una contribución sea aceptada?",
    answer:
      "Las contribuciones deben ser fotografías históricas relevantes para la institución y su comunidad y deberá cumplir con los estándares de calidad. Además, deben respetar los derechos de autor y ser adecuadas para su publicación en la plataforma.",
  },
  {
    question:
      "¿Cómo puedo solicitar una fotografía específica de la plataforma?",
    answer:
      "Puedes solicitar una fotografía haciendo clic en el botón 'Solicitar fotografía' disponible entre los detalles de la imagen. Asegúrate de explicar el propósito de la solicitud.",
  },
  {
    question: "¿Hay algún costo asociado con las solicitudes de fotografías?",
    answer:
      "No, las solicitudes de fotografías son gratuitas. Sin embargo, asegúrate de revisar y respetar los derechos de autor de la imagen solicitada.",
  },
  {
    question:
      "¿Cómo sé si tengo los derechos de autor adecuados para utilizar una fotografía solicitada?",
    answer:
      "Antes de entregar una fotografía solicitada, verificaremos si cuentas con los derechos de autor adecuados, especialmente en casos de licencias Creative Commons. Te notificaremos sobre la disponibilidad de la imagen.",
  },
  {
    question:
      "¿Puedo descargar y utilizar las fotografías de la plataforma para fines educativos?",
    answer:
      "Sí, muchas de las fotografías en nuestra plataforma pueden estar disponibles para uso educativo. Sin embargo, descargándola directamente solo obtendrás una versión de menor calidad que la original. Asegúrate de revisar las licencias y condiciones asociadas a cada imagen.",
  },
  {
    question:
      "¿Puedo compartir las fotografías de la plataforma en redes sociales?",
    answer:
      "Sí, puedes compartir las fotografías siempre y cuando respetes las condiciones de uso y atribuyas adecuadamente la autoría.",
  },
];

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
              Preguntas y respuestas frecuentes
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
            ¿No puedes encontrar la respuesta a tu pregunta? Contáctate con nosotros a través del{" "}
              <a
                href="#"
                className="font-semibold text-mainmf-600 hover:text-mainmf-500"
              >
                formulario de contacto
              </a>{" "}
              .
            </p>
          </div>
          <div className="mt-10 lg:col-span-7 lg:mt-0">
            <dl className="space-y-10">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
