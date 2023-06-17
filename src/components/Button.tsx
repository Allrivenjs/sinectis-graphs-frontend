import { FC, ReactNode } from 'react';

type Button = {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const Button: FC<Button> = ({ children, onClick }) => {
  return (
    <button
      className='px-3 py-2 text-sm text-zinc-200 rounded-md hover:bg-zinc-700 active:translate-y-1 transition-all'
      onClick={onClick}
    >
      {children}
    </button>
  );
};
