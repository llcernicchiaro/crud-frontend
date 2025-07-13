import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Agent, CreateAgentInput, UpdateAgentInput } from "@/types/agent";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().optional(),
  model: z.enum(["gpt-4", "claude", "mistral", "custom"], {
    message: "Model is required.",
  }),
  status: z.enum(["active", "inactive"]).optional(),
  temperature: z.number().min(0).max(1).optional(),
});

interface AgentFormProps {
  initialData?: Agent;
  onSubmit: (data: CreateAgentInput | UpdateAgentInput) => void;
  isSubmitting: boolean;
}

export function AgentForm({
  initialData,
  onSubmit,
  isSubmitting,
}: AgentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? {
      name: "",
      description: "",
      model: "gpt-4",
      status: "active",
      temperature: 0.7,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Agent Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Agent Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input placeholder="Agent Model" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder="Agent Status" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="temperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temperature</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Agent Temperature"
                  {...field}
                  onChange={(event) => {
                    field.onChange(parseFloat(event.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
