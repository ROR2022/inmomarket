import { Container } from "@/components/Container";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contacto | InmoMarket",
  description: "Contáctanos para cualquier consulta, sugerencia o para programar una cita con uno de nuestros agentes inmobiliarios.",
};

export default function ContactPage() {
  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">
              Contacto
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              ¿Tienes alguna pregunta o necesitas ayuda? Contáctanos y te responderemos lo antes posible.
            </p>
          </div>
          
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="text-center p-4">
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Teléfono</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">+52 55 1234 5678</p>
              </div>
              
              <div className="text-center p-4">
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Email</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">info@inmomarket.com</p>
              </div>
              
              <div className="text-center p-4">
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Dirección</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Av. Insurgentes Sur 1234, CDMX</p>
              </div>
            </div>
          </div>
          
          <ContactForm />
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-6">Nuestra Ubicación</h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.1292025182647!2d-99.17732492398033!3d19.416088542006745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff3c1f052fff%3A0xf10724136bef605!2sAv.%20Insurgentes%20Sur%2C%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1686156427919!5m2!1ses-419!2smx" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de InmoMarket en Avenida Insurgentes Sur, Ciudad de México"
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
} 