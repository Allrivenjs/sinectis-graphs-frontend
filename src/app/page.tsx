'use client';
import { Button } from '@/components/Button';
import { Graph } from '@/graph_1';
import { useGraph, useGraphActions } from '@/store/graph';

export default function Home() {
  const { nodes, edges } = useGraph();
  const { addNode, removeNode } = useGraphActions();

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };

  return (
    <main className='flex flex-col items-center justify-between h-full'>
      <div className='w-full p-4'>
        <Button onClick={() => addNode()}>Create a node</Button>
      </div>
      <Graph graph={{ edges, nodes }} events={events} />
    </main>
  );
}
