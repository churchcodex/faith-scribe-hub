import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import PastorCard from "@/components/pastors/PastorCard";
import { mockPastors } from "@/data/mockData";
import Layout from "@/components/layout/Layout";
import { ClergyType } from "@/types/entities";

const Pastors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clergyTypeFilter, setClergyTypeFilter] = useState<ClergyType | "all">("all");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPastors = mockPastors.filter((pastor) => {
    const matchesSearch =
      pastor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pastor.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClergyType = clergyTypeFilter === "all" || pastor.clergy_type === clergyTypeFilter;

    const matchesMinAge = !minAge || pastor.age >= parseInt(minAge);
    const matchesMaxAge = !maxAge || pastor.age <= parseInt(maxAge);

    return matchesSearch && matchesClergyType && matchesMinAge && matchesMaxAge;
  });

  return (
    <Layout>
      <div className="space-y-6 p-6 rounded-xl bg-neutral-700">
        <div>
          <h1 className="text-3xl font-bold text-white/80">Pastors</h1>
          <p className="text-muted-white/text-white/80 mt-2">Browse and analyze pastor profiles</p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto] items-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-900 bg-h-4 w-4" />
            <Input
              placeholder="Search pastors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-slate-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clergy-type">Clergy Type</Label>
            <Select
              value={clergyTypeFilter}
              onValueChange={(value) => setClergyTypeFilter(value as ClergyType | "all")}
            >
              <SelectTrigger id="clergy-type" className="w-full text-slate-800">
                <SelectValue placeholder="All Types" className="text-slate-800" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Bishop">Bishop</SelectItem>
                <SelectItem value="Mother">Mother</SelectItem>
                <SelectItem value="Sister">Sister</SelectItem>
                <SelectItem value="Reverend">Reverend</SelectItem>
                <SelectItem value="Pastor">Pastor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="min-age">Min Age</Label>
            <Input
              id="min-age"
              type="number"
              placeholder="Min"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              className="w-full text-slate-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-age">Max Age</Label>
            <Input
              id="max-age"
              type="number"
              placeholder="Max"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              className="w-full text-slate-800"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {filteredPastors.map((pastor) => (
            <PastorCard key={pastor.id} pastor={pastor} />
          ))}
        </div>

        {filteredPastors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-white/text-white/80">No pastors found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Pastors;
