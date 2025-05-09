import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Search, Star } from "lucide-react";
import { ServiceProviderModal } from "./pages/provider-details";
import serviceProviders from "./assets/MOCK_DATA.json";
import apiClient from "./lib/api-client";

interface ServiceProvider{
  id: number
    name: string,
    service: string,
    location: string,
    rating: number,
    profileImage: string,
    phone: string,
}



const ITEMS_PER_PAGE = 6;

export default function App() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [data,setData] = useState(serviceProviders);

  // Filtered data based on search
  const filteredData = data.filter((sp) =>
    sp.name.toLowerCase().includes(search.toLowerCase())
  );


  apiClient.get('/providers')
  .then((res)=>{
      setData( res.data);
  })
  .catch((res)=>{
    console.log(res);
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleCardClick = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search Bar */}
      <div className="flex items-center space-x-3 mb-4">
        <Search className="text-gray-500" />
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Toggle Tabs for View Mode */}
      <Tabs defaultValue="grid" onValueChange={setView} className="mb-6">
        <TabsList className="flex">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Data Display */}
      <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
        {paginatedData.map((provider) => (
          <Card key={provider.id} className="shadow-md rounded-lg cursor-pointer" onClick={() => handleCardClick(provider)}>
            <CardHeader className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={provider.profileImage} alt={provider.name} />
              </Avatar>
              <div>
                <CardTitle className="text-lg">{provider.name}</CardTitle>
                <p className="text-gray-500 text-sm">{provider.service}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{provider.location}</p>
              <div className="flex items-center space-x-1 text-yellow-500 mt-2">
                {[...Array(Math.round(provider.rating))].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
                <span className="text-sm text-gray-600 ml-1">({provider.rating})</span>
              </div>
              <p className="text-sm text-gray-700 mt-1">📞 {provider.phone}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={18} /> Prev
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next <ChevronRight size={18} />
          </Button>
        </div>
      )}

      {/* Modal */}
      {selectedProvider && (
        <ServiceProviderModal provider={selectedProvider} open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
