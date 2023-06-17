import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Edge, IGraph, Node } from '@/types';

import { v4 as uuidv4 } from 'uuid';

interface GraphState {
  graph: IGraph;
  actions: {
    addNode: (node: Node) => void;
    addEdge: (edge: Edge) => void;
    removeNode: (id: string) => void;
    changeNodePosition: (id: string, newPosition: [number, number]) => void;
    getNodeById: (id: string) => Node | undefined;
  };
}

const useGraphStore = create<GraphState>()(
  devtools(
    // persist(
    (set, get) => ({
      graph: {
        nodes: [
          {
            id: '1',
            label: 'Node 1',
            title: 'node 1 tootip text',
            position: [10, 0],
          },
          {
            id: '2',
            label: 'Node 2',
            title: 'node 2 tootip text',
            position: [-10, 0],
          },
        ],
        edges: [
          {
            from: '1',
            to: '2',
            label: 'lol',
          },
        ],
      },
      actions: {
        addEdge: (edge: Edge) =>
          set((state) => ({
            ...state,
            graph: {
              ...state.graph,
              edges: [...state.graph.edges, edge],
            },
          })),
        addNode: (node: Node) =>
          set((state) => ({
            ...state,
            graph: {
              ...state.graph,
              nodes: [...state.graph.nodes, node],
            },
          })),
        removeNode: (id: string) =>
          set((state) => {
            return {
              ...state,
              graph: {
                ...state.graph,
                nodes: state.graph.nodes.filter((node) => node.id !== id),
                edges: state.graph.edges.filter(
                  (edge) => edge.to !== id && edge.from !== id
                ),
              },
            };
          }),
        changeNodePosition: (id: string, newPosition: [number, number]) =>
          set((state) => {
            return {
              ...state,
              graph: {
                ...state.graph,
                nodes: state.graph.nodes.map((node) => {
                  if (node.id === id) {
                    node.position = newPosition;
                  }
                  return node;
                }),
              },
            };
          }),

        getNodeById: (id?: string) => {
          const { graph } = get();
          const { nodes } = graph;

          return nodes.find((node) => node.id === id);
        },
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
