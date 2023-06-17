import React, { FC } from 'react';

import { Button, Modal } from './';

type NewNodeModal = {
  onClose: () => void;
};

export const NewNodeModal: FC<NewNodeModal> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className='flex flex-col'>
        <p className='font-bold text-lg mb-3'>Create a new Node</p>
        <label className='mb-2 block text-md font-bold'>Label</label>
        <input
          className='w-full bg-zinc-900 rounded-md text-md px-2 py-1 border-zinc-600 border'
          placeholder='Node 1'
        />
        <div className='my-3' />
        <Button>Add node</Button>
      </div>
    </Modal>
  );
};
