import React from "react";
import TreasureCard from "../components/TreasureCard";

interface Treasure {
  _id: string;
  treasureName: string;
  treasureLocation: string;
  treasureDescription: string;
  treasureContact: string;
  treasureType: string;
  openingTime: string;
  closingTime: string;
  treasureImage?: {
    data: Uint8Array;
  };
  owner: string;
  visitors: number;
}

interface TreasureGridProps {
  treasures: Treasure[];
  onDelete: (id: string) => Promise<void>;
}

const TreasureGrid: React.FC<TreasureGridProps> = ({ treasures, onDelete }) => {
  if (treasures.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.5"></path>
            <path d="M18 2v2"></path>
            <path d="M6 2v2"></path>
            <path d="M2 6h20"></path>
            <path d="M14.5 12a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No treasures found
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          It looks like there aren't any treasures yet. They will appear here
          once created.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {treasures.map((treasure) => (
        <TreasureCard
          key={treasure._id}
          treasure={treasure}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TreasureGrid;
