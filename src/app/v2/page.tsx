'use client';
import { Button } from '@/components/Button';
import { Graph } from '@/graph_2';
import { useGraph, useGraphActions } from '@/store/graph';
import { GraphTools } from '@/tools';

export default function Home() {
  const { nodes, edges } = useGraph();

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };

  return (
    <main className='flex flex-col items-center justify-between h-full relative'>
      <GraphTools />
      <Graph graph={{ nodes, edges }} />
    </main>
  );
}
