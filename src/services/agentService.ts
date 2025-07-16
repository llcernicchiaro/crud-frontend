import { fetchAuthSession } from "aws-amplify/auth";
import type { Agent, CreateAgentInput, UpdateAgentInput } from "@/types/agent";

const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

async function getHeaders() {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();

  return {
    "Content-Type": "application/json",
    Authorization: token ?? "",
  };
}

export const createAgent = async (agent: CreateAgentInput): Promise<Agent> => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/agents`, {
    method: "POST",
    headers,
    body: JSON.stringify(agent),
  });

  if (!response.ok) {
    throw new Error(`Error creating agent: ${response.statusText}`);
  }

  const data: Agent = (await response.json()) as Agent;
  return data;
};

export const getAgent = async (id: string): Promise<Agent> => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/agents/${id}`, { headers });

  if (!response.ok) {
    throw new Error(`Error fetching agent: ${response.statusText}`);
  }

  const data: Agent = (await response.json()) as Agent;
  return data;
};

export const listAgents = async (): Promise<Agent[]> => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/agents`, { headers });

  if (!response.ok) {
    throw new Error(`Error listing agents: ${response.statusText}`);
  }

  const data: Agent[] = (await response.json()) as Agent[];
  return data;
};

export const updateAgent = async (
  id: string,
  agent: UpdateAgentInput
): Promise<Agent> => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/agents/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(agent),
  });

  if (!response.ok) {
    throw new Error(`Error updating agent: ${response.statusText}`);
  }

  const data: Agent = (await response.json()) as Agent;
  return data;
};

export const deleteAgent = async (id: string): Promise<void> => {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/agents/${id}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error deleting agent: ${response.statusText}`);
  }
};
