import type { Agent } from "@/types/agent";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, Info, Thermometer, Cpu } from "lucide-react";

interface AgentCardListProps {
  agents: Agent[];
  openEditForm: (agent: Agent) => void;
  openDeleteDialog: (id: string) => void;
}

export function AgentCardList({
  agents,
  openEditForm,
  openDeleteDialog,
}: AgentCardListProps) {
  return (
    <div className="grid gap-4">
      {agents.map((agent) => (
        <Card key={agent.id}>
          <CardHeader>
            <CardTitle>{agent.name}</CardTitle>
            <CardDescription>
              {agent.description ?? "No description provided."}
            </CardDescription>
            <CardAction className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  openEditForm(agent);
                }}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  openDeleteDialog(agent.id);
                }}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-2">
                <Cpu className="h-4 w-4" />
                <span>{agent.model}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4" />
                <span>{agent.status}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Thermometer className="h-4 w-4" />
                <span>{agent.temperature}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
