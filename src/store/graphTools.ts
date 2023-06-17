import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Node } from '@/types';

interface GraphState {
  selectedNode: Node | undefined;
  actions: {
    setSelectedNode: (node: Node | undefined) => void;
  };
}

const useGraphToolsStore = create<GraphState>()(
  devtools((set) => ({
    selectedNode: undefined,
    actions: {
      setSelectedNode: (node: Node | undefined) =>
        set(() => ({
          selectedNode: node,
        })),
    },
  }))
);

export const useGraphTools = () =>
  useGraphToolsStore((state) => state.selectedNode);

export const useGraphToolsActions = () =>
  useGraphToolsStore((state) => state.actions);
