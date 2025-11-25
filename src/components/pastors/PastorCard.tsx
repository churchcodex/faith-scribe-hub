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
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-secondary-200 dark:border-secondary-800 bg-gradient-to-br from-background-50 to-secondary-50 dark:from-background-950 dark:to-secondary-950">
      <CardHeader className="pb-3">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 rounded-full mb-4 overflow-hidden border-4 border-accent-300 dark:border-accent-700">
          <img
            src={currentPastor.profile_image || "/api/placeholder/200/200"}
            alt={currentPastor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-start justify-between">
          <div className="flex-1 text-center">
            <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-100">{currentPastor.name}</h3>
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
            <Briefcase className="h-4 w-4 text-secondary-600 dark:text-secondary-400" />
            <div>
              <p className="text-sm text-text-600 dark:text-text-400">Position</p>
              <p className="font-medium text-secondary-900 dark:text-secondary-100">{currentPastor.position}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-accent-600 dark:text-accent-400" />
            <div>
              <p className="text-sm text-text-600 dark:text-text-400">Age</p>
              <p className="font-medium text-secondary-900 dark:text-secondary-100">{currentPastor.age} years old</p>
            </div>
          </div>
        </div>
        <Button
          asChild
          variant="outline"
          className="w-full mt-4 border-secondary-300 dark:border-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-900"
        >
          <Link to={`/pastors/${currentPastor.id}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PastorCard;
