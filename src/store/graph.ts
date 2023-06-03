import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { IGraph } from '@/types';

interface GraphState {
  graph: IGraph;
  actions: {
    addNode: () => void;
    removeNode: (id: number) => void;
  };
}

const useGraphStore = create<GraphState>()(
  devtools(
    // persist(
    (set) => ({
      graph: {
        nodes: [
          {
            id: 1,
            label: 'Node 1',
            title: 'node 1 tootip text',
            position: [10, 0, 0],
          },
          {
            id: 2,
            label: 'Node 2',
            title: 'node 2 tootip text',
            position: [-10, 0, 0],
          },
        ],
        edges: [
          {
            from: 1,
            to: 2,
            fromPosition: [10, 0, 0],
            toPosition: [-10, 0, 0],
          },
        ],
      },
      actions: {
        addNode: () =>
          set((state) => ({
            ...state,
            graph: {
              ...state.graph,
              nodes: [
                ...state.graph.nodes,
                { id: 6, label: 'asdf', title: 'node', position: [0, 0, 0] },
              ],
            },
          })),
        removeNode: () => {},
      },
      // increase: (by) => set((state) => ({ bears: state.bears + by })),
    }),
    {
      name: 'graph-storage',
    }
  )
  // )
);

export const useGraph = () => useGraphStore((state) => state.graph);

export const useGraphActions = () => useGraphStore((state) => state.actions);
