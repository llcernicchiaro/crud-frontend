import { AgentList } from "./pages/AgentList";
import { ThemeProvider } from "@/components/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <AgentList />
    </ThemeProvider>
  );
}

export default App;
