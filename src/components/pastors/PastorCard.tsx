import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pastor } from "@/types/entities";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PastorEditForm from "@/components/forms/PastorEditForm";

interface PastorCardProps {
  pastor: Pastor;
  onUpdate?: (updatedPastor: Pastor) => void;
}

const PastorCard = ({ pastor, onUpdate }: PastorCardProps) => {
  const [currentPastor, setCurrentPastor] = useState(pastor);
  const navigate = useNavigate();

  const handleUpdate = (updatedPastor: Pastor) => {
    setCurrentPastor(updatedPastor);
    onUpdate?.(updatedPastor);
  };

  const handleCardClick = () => {
    navigate(`/pastors/${currentPastor.id}`);
  };

  return (
    <Card
      className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative group w- max-w-80 cursor-pointer bg-neutral-300"
      onClick={handleCardClick}
    >
      <CardContent className="p-1">
        <div
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <PastorEditForm
            pastor={currentPastor}
            onSave={handleUpdate}
            trigger={
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Edit className="h-3 w-3" />
              </Button>
            }
          />
        </div>
        <div className="w-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-2 overflow-hidden border border-border">
          <img
            src={currentPastor.profile_image || "/api/placeholder/200/200"}
            alt={currentPastor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-center text-xs font-semibold text-foreground">{currentPastor.name}</h3>
      </CardContent>
    </Card>
  );
};

export default PastorCard;
