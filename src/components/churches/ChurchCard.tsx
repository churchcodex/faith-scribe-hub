import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Church } from "@/types/entities";
import { MapPin, Users, DollarSign, User, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import ChurchEditForm from "@/components/forms/ChurchEditForm";

interface ChurchCardProps {
  church: Church;
  onUpdate?: (updatedChurch: Church) => void;
}

const ChurchCard = ({ church, onUpdate }: ChurchCardProps) => {
  const [currentChurch, setCurrentChurch] = useState(church);

  const handleUpdate = (updatedChurch: Church) => {
    setCurrentChurch(updatedChurch);
    onUpdate?.(updatedChurch);
  };
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="aspect-video w-full bg-muted rounded-lg mb-4 overflow-hidden">
          <img
            src={currentChurch.images[0] || "/api/placeholder/400/300"}
            alt={currentChurch.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground">{currentChurch.name}</h3>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{currentChurch.location}</span>
            </div>
          </div>
          <ChurchEditForm 
            church={currentChurch} 
            onSave={handleUpdate}
            trigger={
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Members</p>
              <p className="font-medium">{currentChurch.members.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Income</p>
              <p className="font-medium">${(currentChurch.income / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <User className="h-4 w-4 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Head Pastor</p>
            <p className="font-medium">{currentChurch.head_pastor}</p>
          </div>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/churches/${currentChurch.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChurchCard;