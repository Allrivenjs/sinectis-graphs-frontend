import React, { FC } from 'react';

import { Modal } from './';

type NewNodeModal = {
  onClose: () => void;
};

export const NewNodeModal: FC<NewNodeModal> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <p className='font-bold text-lg'>Create a new Node</p>
      <label>Label</label>
      <input placeholder='' />
    </Modal>
  );
};
