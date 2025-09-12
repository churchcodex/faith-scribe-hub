import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pastor } from "@/types/entities";
import { User, Calendar, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

interface PastorCardProps {
  pastor: Pastor;
}

const PastorCard = ({ pastor }: PastorCardProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="w-24 h-24 mx-auto bg-muted rounded-full mb-4 overflow-hidden">
          <img
            src={pastor.profile_image || "/api/placeholder/200/200"}
            alt={pastor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-foreground text-center">{pastor.name}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Briefcase className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Position</p>
              <p className="font-medium">{pastor.position}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-medium">{pastor.age} years old</p>
            </div>
          </div>
        </div>
        <Button asChild variant="outline" className="w-full mt-4">
          <Link to={`/pastors/${pastor.id}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PastorCard;