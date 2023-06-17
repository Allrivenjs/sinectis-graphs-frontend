import React, { FC, ReactNode, Ref, RefObject, useState } from 'react';

import { createPortal } from 'react-dom';

import { useGraphActions } from '@/store/graph';

import { useGraphTools, useGraphToolsActions } from '@/store/graphTools';

import { Button, Modal, NewNodeModal } from '@/components';

type GraphTools = {
  containerRef: RefObject<HTMLElement>;
};

export const GraphTools: FC<GraphTools> = ({ containerRef }) => {
  const { addNode, removeNode } = useGraphActions();

  const [showNewNodeModal, setShowNewNodeModal] = useState(false);

  const selectedNode = useGraphTools();

  const onClickAddNode = () => {
    setShowNewNodeModal(true);
  };

  const onCloseAddNode = () => {
    setShowNewNodeModal(false);
  };

  return (
    <div className='absolute w-screen h-screen'>
      <div className='absolute bg-zinc-800 z-50 p-2 m-2 rounded-md'>
        <Button onClick={onClickAddNode}>Add a node</Button>
        <Button onClick={() => selectedNode && removeNode(selectedNode.id)}>
          Delete a node
        </Button>
        <Button onClick={() => console.log('edge')}>Add an edge</Button>
      </div>
      {showNewNodeModal &&
        createPortal(
          <NewNodeModal onClose={onCloseAddNode} />,
          containerRef.current!
        )}
    </div>
  );
};
