import React, { FC, ReactNode } from 'react';

type Modal = {
  children: ReactNode;
  onClose: () => void;
};

export const Modal: FC<Modal> = ({ children, onClose }) => {
  return (
    <div
      className='absolute w-full h-full flex items-center justify-center backdrop-blur'
      onClick={onClose}
    >
      <div className='w-[256px] h-1/2 bg-zinc-800 rounded-md p-6'>
        {children}
      </div>
    </div>
  );
};
