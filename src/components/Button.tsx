import { FC, ReactNode } from "react";

type Button = {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const Button: FC<Button> = ({children, onClick}) => {
  return (
    <button 
      className='bg-white px-3 py-2 text-black rounded-md hover:bg-slate-200 active:translate-y-1 transition-all'
      onClick={onClick}
    >{children}</button>
  );
};
