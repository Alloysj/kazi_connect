"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Phone, Star } from "lucide-react";

// Define Service Provider Type
interface ServiceProvider {
  name: string;
  location: string;
  rating: number;
  profileImage: string;
  phone: string;
}

// Hardcoded Reviews
const reviews = [
  { user: "Alice", comment: "Great service, highly recommend!", rating: 5 },
  { user: "John", comment: "Very professional and timely.", rating: 4.5 },
  { user: "Sarah", comment: "Good experience but can improve.", rating: 4 },
];

// Modal Component
export function ServiceProviderModal({ provider, open, onClose }: { provider: ServiceProvider; open: boolean; onClose: () => void }) {
  
  const handleContact = () => {
    window.location.href = `tel:${provider.phone}`
  }
    return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>{provider.name}</DialogTitle>
          <DialogDescription>{provider.location}</DialogDescription>
        </DialogHeader>

        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={provider.profileImage} alt={provider.name} />
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{provider?.name}</p>
            <p className="text-sm text-gray-500">{provider?.location}</p>
            <div className="flex items-center space-x-1 text-yellow-500">
              {[...Array(Math.round(provider?.rating))].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" stroke="none" />
              ))}
              <span className="text-sm text-gray-600 ml-1">({provider?.rating})</span>
            </div>
            <p className="text-sm text-gray-700">📞 {provider?.phone}</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Reviews</h3>
          <div className="space-y-2">
            {reviews.map((review, index) => (
              <div key={index} className="p-3 border rounded-lg shadow-sm">
                <p className="font-medium">{review?.user}</p>
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[...Array(Math.round(review?.rating))].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <p className="text-sm text-gray-700">{review?.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Button */}
        <DialogFooter>
          <Button onClick={handleContact} className="w-full">Contact {provider.name}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
