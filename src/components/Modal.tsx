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
      <div className='w-[256px] bg-zinc-800 rounded-md p-6 border-zinc-700 border'>
        {children}
      </div>
    </div>
  );
};
