import { AgentCard } from "@/components/agents/AgentCard";
import { getAgents } from "@/lib/data/queries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Agents" };

export default async function AgentsPage() {
  const agents = await getAgents();

  return (
    <div className="section-pad container-site py-14">
      <h1 className="display text-4xl text-ink md:text-5xl">Meet the Team</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Local agents with Bulawayo market fluency — ready to buy, sell, or let with you.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agents.map((agent) => (
          <div key={agent.id}>
            <AgentCard agent={agent} />
          </div>
        ))}
      </div>
    </div>
  );
}
