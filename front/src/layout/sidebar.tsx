"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Sidebar Component
export function AppNewSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = React.useState<string | null>(null);
  const [minRating, setMinRating] = React.useState<number | null>(null);

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader>
        <h2 className="text-lg font-bold">Filters</h2>
      </SidebarHeader>

      {/* Content with Filters */}
      <SidebarContent className="p-4 space-y-4">
        {/* Service Filter */}
        <div>
          <Label className="text-sm font-medium">Service Category</Label>
          <div className="flex flex-col space-y-2">
            {["Maid", "Plumber", "Electrician", "Handyman"].map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedServices.includes(service)}
                  onCheckedChange={(checked) => {
                    setSelectedServices((prev) =>
                      checked ? [...prev, service] : prev.filter((s) => s !== service)
                    );
                  }}
                />
                <Label>{service}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <Label className="text-sm font-medium">Location</Label>
          <Select onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nairobi">Nairobi</SelectItem>
              <SelectItem value="Mombasa">Mombasa</SelectItem>
              <SelectItem value="Kisumu">Kisumu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className="w-full">
          <Label className="text-sm font-medium">Minimum Rating</Label>
          <Select onValueChange={(value) => setMinRating(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3.5">3.5+</SelectItem>
              <SelectItem value="4.0">4.0+</SelectItem>
              <SelectItem value="4.5">4.5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4">
        <Button
          onClick={() => {
            setSelectedServices([]);
            setSelectedLocation(null);
            setMinRating(null);
          }}
        >
          Reset Filters
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
