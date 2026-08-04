import { createAgentAccount, toggleAgentActive } from "@/lib/actions";
import { requireAdmin } from "@/lib/auth";

export default async function AdminAgentsPage() {
  const { supabase } = await requireAdmin();
  const { data: agents } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "AGENT")
    .order("name");

  return (
    <div>
      <h1 className="display text-3xl text-ink">Manage Agents</h1>
      <p className="mt-2 text-muted">Create agent accounts and activate or deactivate access.</p>

      <form
        action={async (fd) => {
          "use server";
          await createAgentAccount(fd);
        }}
        className="mt-8 grid max-w-2xl gap-3 border border-line bg-white p-6 sm:grid-cols-2"
      >
        <input className="input sm:col-span-2" name="name" placeholder="Full name" required />
        <input className="input" name="email" type="email" placeholder="Email" required />
        <input
          className="input"
          name="password"
          type="password"
          placeholder="Initial password"
          required
        />
        <input className="input" name="phone" placeholder="Phone" />
        <input className="input" name="title" placeholder="Title" defaultValue="Agent" />
        <button type="submit" className="btn-orange sm:col-span-2">
          Create agent account
        </button>
      </form>

      <div className="mt-10 overflow-x-auto border border-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs tracking-wider text-muted uppercase">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(agents ?? []).map((agent) => (
              <tr key={agent.id} className="border-b border-line">
                <td className="px-4 py-3 font-medium">{agent.name}</td>
                <td className="px-4 py-3 text-muted">{agent.email}</td>
                <td className="px-4 py-3">{agent.active ? "Active" : "Inactive"}</td>
                <td className="px-4 py-3 text-right">
                  <form
                    action={async () => {
                      "use server";
                      await toggleAgentActive(agent.id, !agent.active);
                    }}
                  >
                    <button type="submit" className="text-xs font-semibold tracking-wider text-orange uppercase">
                      {agent.active ? "Deactivate" : "Activate"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {!agents?.length && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  No agents yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
