import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import PastorCard from "@/components/pastors/PastorCard";
import { mockPastors } from "@/data/mockData";
import Layout from "@/components/layout/Layout";

const Pastors = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPastors = mockPastors.filter(
    (pastor) =>
      pastor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pastor.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pastors</h1>
          <p className="text-muted-foreground mt-2">
            Browse and analyze pastor profiles
          </p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search pastors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPastors.map((pastor) => (
            <PastorCard key={pastor.id} pastor={pastor} />
          ))}
        </div>

        {filteredPastors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No pastors found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Pastors;