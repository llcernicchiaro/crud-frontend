import { useEffect, useState } from "react";
import type { Agent, CreateAgentInput, UpdateAgentInput } from "@/types/agent";
import {
  listAgents,
  createAgent,
  updateAgent,
  deleteAgent,
} from "@/services/agentService";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AgentForm } from "@/components/AgentForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

export function AgentList() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [agentToDelete, setAgentToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchAgents();
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
    agentData: UpdateAgentInput | CreateAgentInput
  ) => {
    setIsSubmitting(true);
    try {
      if (selectedAgent) {
        await updateAgent(selectedAgent.id, agentData);
      } else {
        await createAgent(agentData as CreateAgentInput);
      }

      fetchAgents();
      setIsFormOpen(false);
      setSelectedAgent(null);
    } catch (err) {
      setError("Failed to save agent.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAgent = async () => {
    if (agentToDelete) {
      try {
        await deleteAgent(agentToDelete);
        fetchAgents();
        setIsDeleteDialogOpen(false);
        setAgentToDelete(null);
      } catch (err) {
        setError("Failed to delete agent.");
        console.error(err);
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

  if (loading) return <div>Loading agents...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agent Management</h1>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          <Button onClick={openCreateForm} className="mb-4">
            Create New Agent
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedAgent ? "Edit Agent" : "Create New Agent"}
            </DialogTitle>
          </DialogHeader>
          <AgentForm
            initialData={selectedAgent || undefined}
            onSubmit={handleCreateOrUpdateAgent}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Temperature</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => (
            <TableRow key={agent.id}>
              <TableCell>{agent.name}</TableCell>
              <TableCell>{agent.description}</TableCell>
              <TableCell>{agent.model}</TableCell>
              <TableCell>{agent.status}</TableCell>
              <TableCell>{agent.temperature}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditForm(agent)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => openDeleteDialog(agent.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              agent.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAgent}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
