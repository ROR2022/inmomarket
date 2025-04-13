import { FC, ReactNode } from "react";

interface FAQLayoutProps {
  children: ReactNode;
}

const FAQLayout: FC<FAQLayoutProps> = ({ children }) => {
  return (
    <main className="flex-1">
      {children}
    </main>
  );
};

export default FAQLayout; 