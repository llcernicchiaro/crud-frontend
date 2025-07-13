export interface Agent {
  id: string;
  name: string;
  description?: string;
  model: 'gpt-4' | 'claude' | 'mistral' | 'custom';
  status?: 'active' | 'inactive';
  temperature?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAgentInput {
  name: string;
  description?: string;
  model: 'gpt-4' | 'claude' | 'mistral' | 'custom';
  status?: 'active' | 'inactive';
  temperature?: number;
}

export type UpdateAgentInput = Partial<Omit<Agent, 'id' | 'createdAt' | 'updatedAt'>>;
