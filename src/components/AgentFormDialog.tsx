import type { Agent, CreateAgentInput, UpdateAgentInput } from "@/types/agent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { AgentForm } from "@/components/AgentForm";

interface AgentFormDialogProps {
  selectedAgent: Agent | null;
  isFormOpen: boolean;
  setIsFormOpen: (isOpen: boolean) => void;
  openCreateForm: () => void;
  handleCreateOrUpdateAgent: (
    agentData: CreateAgentInput | UpdateAgentInput
  ) => Promise<void>;
  isSubmitting: boolean;
}

export function AgentFormDialog({
  selectedAgent,
  isFormOpen,
  setIsFormOpen,
  openCreateForm,
  handleCreateOrUpdateAgent,
  isSubmitting,
}: AgentFormDialogProps) {
  return (
    <Dialog
      open={isFormOpen}
      onOpenChange={(open) => {
        setIsFormOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <div>
          <Button onClick={openCreateForm} className="md:hidden" size="icon">
            <PlusIcon className="h-4 w-4" />
          </Button>
          <Button onClick={openCreateForm} className="hidden md:block">
            Create New Agent
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedAgent ? "Edit Agent" : "Create New Agent"}
          </DialogTitle>
          <DialogDescription>
            {selectedAgent
              ? "Edit the details of your agent."
              : "Create a new agent by filling in the details below."}
          </DialogDescription>
        </DialogHeader>
        <AgentForm
          initialData={selectedAgent ?? undefined}
          onSubmit={handleCreateOrUpdateAgent}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
