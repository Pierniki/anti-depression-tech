"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";

const getDropletKey = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  return `droplets-${year}-${month}-${day}`;
};

export default function WaterTracker() {
  const MAX_DROPLETS = 10;

  // Initialize state from localStorage or default to 0
  const [droplets, setDroplets] = useState(() => {
    const saved = localStorage.getItem(getDropletKey());
    return saved ? parseInt(saved, 10) : 0;
  });

  // Sync to localStorage whenever droplets changes
  useEffect(() => {
    localStorage.setItem(getDropletKey(), droplets.toString());
  }, [droplets]);

  const incrementDroplets = () => {
    if (droplets < MAX_DROPLETS) {
      setDroplets(droplets + 1);
    }
  };

  const decrementDroplets = () => {
    if (droplets > 0) {
      setDroplets(droplets - 1);
    }
  };

  return (
    <Card className="mx-auto w-24 overflow-hidden border-none bg-neutral-100 pb-0">
      <CardContent className="flex flex-col items-center space-y-4 p-0">
        <div className="mb-4 flex flex-col-reverse items-center space-y-2 space-y-reverse">
          {[...Array(MAX_DROPLETS)].map((_, index) => (
            <div key={index}>
              <Droplet
                className={`h-7 w-7 ${
                  index < droplets
                    ? "fill-neutral-900 text-neutral-900"
                    : "fill-transparent text-neutral-900"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="text-md font-bold">
          {droplets} / {MAX_DROPLETS}
        </div>

        <div className="mt-4 flex w-full flex-col items-center justify-center">
          <Button
            onClick={incrementDroplets}
            className="flex w-full cursor-pointer items-center justify-center rounded-none border-y-1 border-neutral-700 bg-neutral-100 text-neutral-900 shadow-none hover:bg-neutral-300"
            disabled={droplets >= MAX_DROPLETS}
          >
            <Plus className="h-6 w-6" />
            <span className="sr-only">Add water</span>
          </Button>

          <Button
            variant="outline"
            onClick={decrementDroplets}
            className="flex h-6 w-full cursor-pointer items-center justify-center rounded-none border-2 border-none bg-transparent py-0 text-[#EC4949] shadow-none hover:bg-[#EC4949]/10"
            disabled={droplets <= 0}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Remove water</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
