import { twMerge } from 'tailwind-merge';

export const MainTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={twMerge('text-4xl font-bold mb-8 text-white', className)}>
      {children}
    </h1>
  );
};
