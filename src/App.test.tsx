import { render, screen } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

// Mock the agentService
vi.mock('./services/agentService', () => ({
  listAgents: vi.fn(() => Promise.resolve([])), // Mock listAgents to return an empty array
  createAgent: vi.fn(),
  getAgent: vi.fn(),
  updateAgent: vi.fn(),
  deleteAgent: vi.fn(),
}));

describe('App', () => {
  it('should render the main application component', async () => {
    render(<App />);
    // Assuming 'AI Agent Management' is a static title that appears after loading
    expect(await screen.findByText(/Agent Management/i)).toBeInTheDocument();
  });
});