import { createFileRoute, Link } from "@tanstack/react-router";

import { api } from "@craftgen/ui/lib/api";
import { ProjectList } from "@craftgen/ui/views/project-list";
import { WorkflowList } from "@craftgen/ui/views/workflow-list";

const DashboardPage = () => {
  const data = Route.useLoaderData();
  const { data: featuredWorkflows } = api.craft.module.featured.useQuery(
    {
      category: "all",
      count: 4,
    },
    {
      initialData: data.featuredWorkflows,
    },
  );
  return (
    <div className="mx-auto flex  max-w-6xl flex-col space-y-10 p-4">
      <div>
        <ProjectList Link={Link} />
      </div>
      <div>
        <h1 className="font-mono text-2xl">Recent Workflows</h1>
        <div className="py-4">
          <WorkflowList workflows={featuredWorkflows} Link={Link} />
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_layout/")({
  component: DashboardPage,
  loader: async ({ context: { client } }) => {
    const featuredWorkflows = await client.craft.module.featured.ensureData({
      count: 4,
      category: "all",
    });
    return {
      featuredWorkflows,
    };
  },
});
