import { Container } from "@/components/Container";
import AccordionFAQ from "@/components/AccordionFAQ";

export const metadata = {
  title: "Preguntas Frecuentes | InmoMarket",
  description: "Encuentra respuestas a las preguntas más comunes sobre InmoMarket - tu plataforma para comprar, vender y alquilar propiedades inmobiliarias.",
};

export default function FAQPage() {
  const generalQuestions = [
    {
      title: "¿Qué es InmoMarket?",
      content: "InmoMarket es una plataforma web diseñada para simplificar la compra, venta y alquiler de propiedades inmobiliarias. Conecta a compradores, vendedores y agentes inmobiliarios en un entorno digital intuitivo, seguro y eficiente, permitiendo a los usuarios explorar, listar y gestionar propiedades desde un solo lugar."
    },
    {
      title: "¿Cómo puedo registrarme en InmoMarket?",
      content: "Para registrarte en InmoMarket, haz clic en el botón 'Registrarse' ubicado en la esquina superior derecha de la página. Completa el formulario con tu información personal, acepta los términos y condiciones, y confirma tu correo electrónico. ¡Listo! Ya puedes comenzar a utilizar nuestra plataforma."
    },
    {
      title: "¿Es gratis usar InmoMarket?",
      content: "Sí, el registro y la búsqueda de propiedades en InmoMarket son completamente gratuitos para compradores y arrendatarios. Para vendedores y agentes inmobiliarios, ofrecemos planes básicos gratuitos y opciones premium con características adicionales."
    },
    {
      title: "¿En qué países está disponible InmoMarket?",
      content: "Actualmente, InmoMarket está disponible principalmente en países de América Latina, con especial atención en México, Argentina y Colombia. Estamos trabajando para expandirnos a más países en el futuro cercano."
    }
  ];

  const buyerQuestions = [
    {
      title: "¿Cómo puedo buscar propiedades en InmoMarket?",
      content: "Puedes utilizar nuestra función de búsqueda avanzada para encontrar propiedades según ubicación, tipo (casa, departamento, terreno), precio, tamaño, número de habitaciones y otros criterios personalizados. Los resultados pueden ordenarse por relevancia, precio o fecha de publicación."
    },
    {
      title: "¿Cómo me pongo en contacto con un vendedor?",
      content: "En cada listado de propiedad, encontrarás un botón para contactar al vendedor o agente. Puedes enviar un mensaje directo a través de nuestra plataforma, sin necesidad de compartir tu información personal. También ofrecemos la opción de programar visitas virtuales o presenciales."
    },
    {
      title: "¿Cómo puedo guardar propiedades que me interesan?",
      content: "Después de iniciar sesión, puedes guardar propiedades en tu lista de favoritos haciendo clic en el ícono de corazón junto a cada listado. Puedes acceder a tus favoritos en cualquier momento desde tu perfil de usuario."
    },
    {
      title: "¿Es seguro realizar pagos a través de InmoMarket?",
      content: "Sí, InmoMarket utiliza Mercado Pago como pasarela de pagos segura para procesar todas las transacciones. Los pagos están protegidos y puedes elegir entre diversos métodos según tu país (tarjetas, transferencias, efectivo en puntos autorizados)."
    }
  ];

  const sellerQuestions = [
    {
      title: "¿Cómo puedo publicar mi propiedad en InmoMarket?",
      content: "Una vez registrado como vendedor, haz clic en 'Publicar Propiedad' en tu dashboard. Completa el formulario con los detalles de tu inmueble, sube fotos y videos de calidad, establece un precio y publica tu anuncio. Nuestro equipo revisará y aprobará tu listado dentro de 24 horas."
    },
    {
      title: "¿Cuántas fotos puedo subir por cada propiedad?",
      content: "En el plan básico, puedes subir hasta 10 fotos por propiedad. Los planes premium permiten hasta 30 fotos, videos y recorridos virtuales 360°, lo que aumenta significativamente el interés y las visitas a tu propiedad."
    },
    {
      title: "¿Cómo puedo destacar mi propiedad entre los demás anuncios?",
      content: "Ofrecemos opciones de promoción como 'Anuncio Destacado' y 'Top de Búsqueda' que dan mayor visibilidad a tu propiedad. Estas opciones están disponibles por un costo adicional desde tu panel de vendedor."
    },
    {
      title: "¿Cómo me notifican cuando alguien está interesado en mi propiedad?",
      content: "Recibirás notificaciones en tiempo real por correo electrónico y en la plataforma cuando un comprador envíe un mensaje o muestre interés en tu propiedad. Puedes responder directamente desde InmoMarket para mantener toda la comunicación centralizada."
    }
  ];

  const agentQuestions = [
    {
      title: "¿Qué beneficios tengo como agente inmobiliario en InmoMarket?",
      content: "Como agente verificado, obtienes un perfil profesional destacado, herramientas para gestionar múltiples propiedades, estadísticas avanzadas de rendimiento, y la posibilidad de construir una reputación con reseñas de clientes. También ofrecemos comisiones preferenciales y soporte prioritario."
    },
    {
      title: "¿Cómo me verifico como agente inmobiliario?",
      content: "Para verificar tu cuenta como agente, debes proporcionar tu información profesional, licencia inmobiliaria (si aplica en tu país) y documentos de identificación. Nuestro equipo revisará esta información y activará los beneficios de agente en tu cuenta dentro de 48 horas."
    },
    {
      title: "¿Puedo integrar mi CRM con InmoMarket?",
      content: "Sí, ofrecemos integraciones con sistemas populares de CRM inmobiliario. Para configurarlo, visita la sección 'Integraciones' en tu panel de agente. Si utilizas un CRM personalizado, contacta a nuestro equipo técnico para evaluar posibles soluciones."
    },
    {
      title: "¿Cómo puedo ver estadísticas de mis propiedades?",
      content: "En tu panel de agente encontrarás una sección de 'Estadísticas' donde puedes monitorear el rendimiento de tus listados, incluyendo vistas, contactos, tasas de conversión y comparativas con el mercado. Estas métricas te ayudarán a optimizar tus estrategias de venta."
    }
  ];

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">
              Preguntas Frecuentes
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Encuentre respuestas a las preguntas más comunes sobre InmoMarket
            </p>
          </div>
          
          <AccordionFAQ 
            categoryName="Información General" 
            questions={generalQuestions} 
          />
          
          <AccordionFAQ 
            categoryName="Para Compradores" 
            questions={buyerQuestions} 
          />
          
          <AccordionFAQ 
            categoryName="Para Vendedores" 
            questions={sellerQuestions} 
          />
          
          <AccordionFAQ 
            categoryName="Para Agentes Inmobiliarios" 
            questions={agentQuestions} 
          />
        </div>
      </Container>
    </div>
  );
} 