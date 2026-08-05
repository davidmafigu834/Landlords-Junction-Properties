import { AgentCard } from "@/components/agents/AgentCard";
import { getAgents } from "@/lib/data/queries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Agents" };

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <div className="section-pad container-site py-10 sm:py-14">
      <h1 className="display text-3xl text-ink sm:text-4xl md:text-5xl">Our advisers</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">
        Calm, precise advisers who protect value first — ready to guide buying, selling, and letting
        with clarity and care.
      </p>
      <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {agents.map((agent) => (
          <div key={agent.id} className="min-w-0">
            <AgentCard agent={agent} />
          </div>
        ))}
      </div>
    </div>
  );
}
