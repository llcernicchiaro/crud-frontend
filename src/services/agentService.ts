import type { Agent, CreateAgentInput, UpdateAgentInput } from "@/types/agent";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const createAgent = async (agent: CreateAgentInput): Promise<Agent> => {
  const response = await fetch(`${API_BASE_URL}/agents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(agent),
  });

  if (!response.ok) {
    throw new Error(`Error creating agent: ${response.statusText}`);
  }

  return response.json();
};

export const getAgent = async (id: string): Promise<Agent> => {
  const response = await fetch(`${API_BASE_URL}/agents/${id}`);

  if (!response.ok) {
    throw new Error(`Error fetching agent: ${response.statusText}`);
  }

  return response.json();
};

export const listAgents = async (): Promise<Agent[]> => {
  const response = await fetch(`${API_BASE_URL}/agents`);

  if (!response.ok) {
    throw new Error(`Error listing agents: ${response.statusText}`);
  }

  return response.json();
};

export const updateAgent = async (
  id: string,
  agent: UpdateAgentInput
): Promise<Agent> => {
  const response = await fetch(`${API_BASE_URL}/agents/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(agent),
  });

  if (!response.ok) {
    throw new Error(`Error updating agent: ${response.statusText}`);
  }

  return response.json();
};

export const deleteAgent = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/agents/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error deleting agent: ${response.statusText}`);
  }
};
