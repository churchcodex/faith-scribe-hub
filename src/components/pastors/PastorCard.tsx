import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pastor } from "@/types/entities";
import { User, Calendar, Briefcase, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import PastorEditForm from "@/components/forms/PastorEditForm";

interface PastorCardProps {
  pastor: Pastor;
  onUpdate?: (updatedPastor: Pastor) => void;
}

const PastorCard = ({ pastor, onUpdate }: PastorCardProps) => {
  const [currentPastor, setCurrentPastor] = useState(pastor);

  const handleUpdate = (updatedPastor: Pastor) => {
    setCurrentPastor(updatedPastor);
    onUpdate?.(updatedPastor);
  };
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-4 overflow-hidden border-4 border-border">
          <img
            src={currentPastor.profile_image || "/api/placeholder/200/200"}
            alt={currentPastor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-start justify-between">
          <div className="flex-1 text-center">
            <h3 className="text-xl font-semibold text-foreground">{currentPastor.name}</h3>
          </div>
          <PastorEditForm
            pastor={currentPastor}
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
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Briefcase className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Position</p>
              <p className="font-medium text-foreground">{currentPastor.position}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-medium text-foreground">{currentPastor.age} years old</p>
            </div>
          </div>
        </div>
        <Button
          asChild
          variant="outline"
          className="w-full mt-4"
        >
          <Link to={`/pastors/${currentPastor.id}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PastorCard;
