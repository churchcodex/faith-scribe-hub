import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pastor } from "@/types/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const pastorEditSchema = z.object({
  name: z.string().min(1, "Pastor name is required"),
  age: z.number().min(18, "Age must be at least 18").max(120, "Age must be realistic"),
  position: z.string().min(1, "Position is required"),
});

type PastorEditFormData = z.infer<typeof pastorEditSchema>;

interface PastorEditFormProps {
  pastor: Pastor;
  onSave: (updatedPastor: Pastor) => void;
  trigger?: React.ReactNode;
}

const PastorEditForm = ({ pastor, onSave, trigger }: PastorEditFormProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<PastorEditFormData>({
    resolver: zodResolver(pastorEditSchema),
    defaultValues: {
      name: pastor.name,
      age: pastor.age,
      position: pastor.position,
    },
  });

  const onSubmit = (data: PastorEditFormData) => {
    const updatedPastor: Pastor = {
      ...pastor,
      ...data,
    };
    
    onSave(updatedPastor);
    setOpen(false);
    
    toast({
      title: "Pastor Updated",
      description: `${data.name} has been successfully updated.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Pastor Information</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter pastor's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Senior Pastor, Lead Pastor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter age" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PastorEditForm;