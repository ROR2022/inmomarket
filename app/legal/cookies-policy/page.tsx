import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';

export const metadata = {
  title: 'Política de Cookies - InmoMarket',
  description: 'Política de Cookies de InmoMarket - Información sobre cómo utilizamos las cookies en nuestro sitio web.'
};

export default async function CookiesPolicyPage() {
  // Leer el contenido del archivo MDX
  const filePath = path.join(process.cwd(), 'legal', 'cookies-policy.mdx');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return (
    <div>
      <MDXRemote source={fileContent} />
    </div>
  );
} 