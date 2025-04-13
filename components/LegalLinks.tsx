import Link from 'next/link';

interface LegalLinksProps {
  className?: string;
  variant?: 'footer' | 'vertical' | 'horizontal';
}

export default function LegalLinks({ className = '', variant = 'horizontal' }: LegalLinksProps) {
  const links = [
    { label: 'Términos y Condiciones', href: '/legal/terms' },
    { label: 'Aviso de Privacidad', href: '/legal/privacy-policy' },
    { label: 'Política de Cookies', href: '/legal/cookies-policy' },
  ];

  const containerClass = variant === 'footer' 
    ? 'text-sm text-gray-500 space-y-1 md:space-y-0 md:space-x-4'
    : variant === 'vertical'
      ? 'flex flex-col space-y-2'
      : 'flex flex-wrap gap-x-4 gap-y-2';

  return (
    <div className={`${containerClass} ${className}`}>
      {links.map((link, index) => (
        <div key={link.href} className={variant === 'footer' ? 'md:inline-block' : ''}>
          <Link 
            href={link.href}
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            {link.label}
          </Link>
          {variant === 'footer' && index < links.length - 1 && (
            <span className="hidden md:inline-block md:mx-2">|</span>
          )}
        </div>
      ))}
    </div>
  );
} 