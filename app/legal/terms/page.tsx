import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';

export const metadata = {
  title: 'Términos y Condiciones - InmoMarket',
  description: 'Términos y Condiciones de InmoMarket - Disposiciones legales que rigen el uso de nuestra plataforma.'
};

export default async function TermsPage() {
  // Leer el contenido del archivo MDX
  const filePath = path.join(process.cwd(), 'legal', 'terms.mdx');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return (
    <div>
      <MDXRemote source={fileContent} />
    </div>
  );
} 