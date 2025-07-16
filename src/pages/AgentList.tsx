import { useEffect, useState } from "react";
import type { Agent, CreateAgentInput, UpdateAgentInput } from "@/types/agent";
import {
  listAgents,
  createAgent,
  updateAgent,
  deleteAgent,
} from "@/services/agentService";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";
import { AgentListSkeleton } from "@/components/AgentListSkeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { AgentTable } from "@/components/AgentTable";
import { AgentCardList } from "@/components/AgentCardList";
import { AgentFormDialog } from "@/components/AgentFormDialog";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";

export default function AgentList() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [agentToDelete, setAgentToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "card">(() => {
    return window.innerWidth >= 768 ? "table" : "card";
  });

  useEffect(() => {
    void fetchAgents();

    const handleResize = () => {
      setViewMode(window.innerWidth >= 768 ? "table" : "card");
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const data = await listAgents();
      setAgents(data);
    } catch (err) {
      setError("Failed to fetch agents.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateAgent = async (
    agentData: CreateAgentInput | UpdateAgentInput
  ) => {
    setIsSubmitting(true);
    try {
      if (selectedAgent) {
        await updateAgent(selectedAgent.id, agentData as UpdateAgentInput);
        toast.success("Agent updated successfully!");
      } else {
        await createAgent(agentData as CreateAgentInput);
        toast.success("Agent created successfully!");
      }
      void fetchAgents();
      setIsFormOpen(false);
      setSelectedAgent(null);
    } catch (err) {
      setError("Failed to save agent.");
      toast.error("Failed to save agent.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAgent = async () => {
    if (agentToDelete) {
      setIsDeleting(true);
      try {
        await deleteAgent(agentToDelete);
        void fetchAgents();
        setIsDeleteDialogOpen(false);
        setAgentToDelete(null);
        toast.success("Agent deleted successfully!");
      } catch (err) {
        setError("Failed to delete agent.");
        toast.error("Failed to delete agent.");
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const openCreateForm = () => {
    setSelectedAgent(null);
    setIsFormOpen(true);
  };

  const openEditForm = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setAgentToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  if (loading) {
    return <AgentListSkeleton viewMode={viewMode} />;
  }
  if (error)
    return (
      <Alert variant="destructive">
        <Info className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Agents</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Card View</span>
            <Switch
              checked={viewMode === "table"}
              onCheckedChange={(checked) => {
                setViewMode(checked ? "table" : "card");
              }}
              aria-label="Toggle view mode"
            />
            <span className="text-sm text-gray-500">Table View</span>
          </div>

          <AgentFormDialog
            selectedAgent={selectedAgent}
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            openCreateForm={openCreateForm}
            handleCreateOrUpdateAgent={handleCreateOrUpdateAgent}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {viewMode === "table" && (
        <AgentTable
          agents={agents}
          openEditForm={openEditForm}
          openDeleteDialog={openDeleteDialog}
        />
      )}

      {viewMode === "card" && (
        <AgentCardList
          agents={agents}
          openEditForm={openEditForm}
          openDeleteDialog={openDeleteDialog}
        />
      )}

      {agents.length === 0 && !error && (
        <div className="text-center py-8 text-gray-500">
          No agents found. Create a new agent to get started!
        </div>
      )}

      <DeleteConfirmationDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        handleDeleteAgent={handleDeleteAgent}
        isDeleting={isDeleting}
      />
    </div>
  );
}
