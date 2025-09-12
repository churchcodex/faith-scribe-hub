import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Users, DollarSign, User, Camera, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockChurches, mockPastors } from "@/data/mockData";
import Layout from "@/components/layout/Layout";
import ChurchEditForm from "@/components/forms/ChurchEditForm";

const ChurchDetail = () => {
  const { id } = useParams();
  const [church, setChurch] = useState(() => mockChurches.find((c) => c.id === id));
  const headPastor = mockPastors.find((p) => p.name === church?.head_pastor);

  const handleUpdate = (updatedChurch: typeof church) => {
    if (updatedChurch) {
      setChurch(updatedChurch);
    }
  };

  if (!church) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Church not found.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/churches">Back to Churches</Link>
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
            <Link to="/churches">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Churches
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{church.name}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4" />
                      <span>{church.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Active</Badge>
                    <ChurchEditForm 
                      church={church} 
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
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden mb-6">
                  <img
                    src={church.images[0] || "/api/placeholder/600/400"}
                    alt={church.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Members</p>
                      <p className="text-lg font-semibold">{church.members.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Income</p>
                      <p className="text-lg font-semibold">${(church.income / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Camera className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Images</p>
                      <p className="text-lg font-semibold">{church.images.length}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-muted-foreground">
                  <p>
                    This church serves as a significant religious institution in {church.location}, 
                    with a substantial congregation of {church.members.toLocaleString()} members. 
                    The organization reports an annual income of ${(church.income / 1000000).toFixed(1)} million, 
                    indicating its substantial operational capacity and community impact.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Head Pastor
                </CardTitle>
              </CardHeader>
              <CardContent>
                {headPastor ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-full overflow-hidden">
                        <img
                          src={headPastor.profile_image || "/api/placeholder/100/100"}
                          alt={headPastor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{headPastor.name}</p>
                        <p className="text-sm text-muted-foreground">{headPastor.position}</p>
                        <p className="text-sm text-muted-foreground">{headPastor.age} years old</p>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/pastors/${headPastor.id}`}>View Pastor Profile</Link>
                    </Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Pastor information not available</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Map
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="h-4 w-4 mr-2" />
                  View Gallery
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChurchDetail;