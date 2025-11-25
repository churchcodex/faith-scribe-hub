import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ChurchCard from "@/components/churches/ChurchCard";
import { mockChurches } from "@/data/mockData";
import Layout from "@/components/layout/Layout";

const Churches = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredChurches = mockChurches.filter(
    (church) =>
      church.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      church.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      church.head_pastor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Churches</h1>
          <p className="text-muted-foreground mt-2">Browse and analyze church information</p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search churches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredChurches.map((church) => (
            <ChurchCard key={church.id} church={church} />
          ))}
        </div>

        {filteredChurches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No churches found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Churches;
