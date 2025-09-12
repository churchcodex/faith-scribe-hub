import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Church } from "@/types/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const churchEditSchema = z.object({
  name: z.string().min(1, "Church name is required"),
  location: z.string().min(1, "Location is required"),
  head_pastor: z.string().min(1, "Head pastor is required"),
  members: z.number().min(0, "Members must be a positive number"),
  income: z.number().min(0, "Income must be a positive number"),
});

type ChurchEditFormData = z.infer<typeof churchEditSchema>;

interface ChurchEditFormProps {
  church: Church;
  onSave: (updatedChurch: Church) => void;
  trigger?: React.ReactNode;
}

const ChurchEditForm = ({ church, onSave, trigger }: ChurchEditFormProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ChurchEditFormData>({
    resolver: zodResolver(churchEditSchema),
    defaultValues: {
      name: church.name,
      location: church.location,
      head_pastor: church.head_pastor,
      members: church.members,
      income: church.income,
    },
  });

  const onSubmit = (data: ChurchEditFormData) => {
    const updatedChurch: Church = {
      ...church,
      ...data,
    };
    
    onSave(updatedChurch);
    setOpen(false);
    
    toast({
      title: "Church Updated",
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Church Information</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Church Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter church name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="head_pastor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Head Pastor</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter head pastor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="members"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Members</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Income</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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

export default ChurchEditForm;