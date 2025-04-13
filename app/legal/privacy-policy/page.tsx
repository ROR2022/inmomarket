import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';

export const metadata = {
  title: 'Aviso de Privacidad - InmoMarket',
  description: 'Aviso de Privacidad de InmoMarket - Información sobre cómo recopilamos, utilizamos y protegemos sus datos personales.'
};

export default async function PrivacyPolicyPage() {
  // Leer el contenido del archivo MDX
  const filePath = path.join(process.cwd(), 'legal', 'privacy-policy.mdx');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return (
    <div>
      <MDXRemote source={fileContent} />
    </div>
  );
} 