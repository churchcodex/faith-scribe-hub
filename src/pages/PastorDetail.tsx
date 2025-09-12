import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Calendar, Briefcase, Church, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockPastors, mockChurches } from "@/data/mockData";
import Layout from "@/components/layout/Layout";
import PastorEditForm from "@/components/forms/PastorEditForm";

const PastorDetail = () => {
  const { id } = useParams();
  const [pastor, setPastor] = useState(() => mockPastors.find((p) => p.id === id));
  const associatedChurch = mockChurches.find((c) => c.head_pastor === pastor?.name);

  const handleUpdate = (updatedPastor: typeof pastor) => {
    if (updatedPastor) {
      setPastor(updatedPastor);
    }
  };

  if (!pastor) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Pastor not found.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/pastors">Back to Pastors</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/pastors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Pastors
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 bg-muted rounded-full overflow-hidden">
                    <img
                      src={pastor.profile_image || "/api/placeholder/200/200"}
                      alt={pastor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl">{pastor.name}</CardTitle>
                        <p className="text-lg text-muted-foreground mt-1">{pastor.position}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Active</Badge>
                        <PastorEditForm 
                          pastor={pastor} 
                          onSave={handleUpdate}
                          trigger={
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          }
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Age</p>
                          <p className="font-semibold">{pastor.age} years old</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Position</p>
                          <p className="font-semibold">{pastor.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Biography</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-muted-foreground">
                  <p>
                    {pastor.name} serves as {pastor.position.toLowerCase()} and has been a significant 
                    figure in their religious community. At {pastor.age} years old, they bring extensive 
                    experience and leadership to their role in ministry and community service.
                  </p>
                  <p className="mt-4">
                    Their dedication to spiritual guidance and community development has made them 
                    a respected leader in their field, contributing to the growth and well-being 
                    of their congregation and the broader community.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {associatedChurch && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Church className="h-5 w-5" />
                    Associated Church
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                      <img
                        src={associatedChurch.images[0] || "/api/placeholder/300/200"}
                        alt={associatedChurch.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{associatedChurch.name}</p>
                      <p className="text-sm text-muted-foreground">{associatedChurch.location}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {associatedChurch.members.toLocaleString()} members
                      </p>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/churches/${associatedChurch.id}`}>View Church Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  Contact information would be displayed here based on privacy settings and available data.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  View Full Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PastorDetail;