import React, { useState } from "react";
import { Trash2, MapPin, Clock, Eye, User } from "lucide-react";

interface TreasureCardProps {
  treasure: {
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
    owner: {
      _id: string;
      userName: string;
    };
    visitors: number;
  };
  onDelete: (id: string) => void;
}

const TreasureCard: React.FC<TreasureCardProps> = ({ treasure, onDelete }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Convert image data to base64 if it exists
  const imageSource = treasure.treasureImage;

  // Get type color based on treasure type
  const getTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      historical: "bg-amber-100 text-amber-800",
      natural: "bg-emerald-100 text-emerald-800",
      cultural: "bg-purple-100 text-purple-800",
      architectural: "bg-blue-100 text-blue-800",
      religious: "bg-red-100 text-red-800",
    };

    return typeColors[type.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    onDelete(treasure._id);
    setShowConfirmDelete(false);
  };

  return (
    <div className="relative dark:bg-muted/80 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      {/* Image section */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={`http://localhost:1010${treasure.treasureImage}`}
          alt={treasure.treasureName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
              treasure.treasureType
            )}`}
          >
            {treasure.treasureType}
          </span>
        </div>
      </div>

      {/* Content section */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 dark:text-white">
          {treasure.treasureName}
        </h3>

        <div className="flex items-center text-gray-600 mb-2 dark:text-white">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm line-clamp-1">
            {treasure.treasureLocation}
          </span>
        </div>

        <div className="flex items-center text-gray-600 mb-3 dark:text-white">
          <Clock size={16} className="mr-1" />
          <span className="text-sm">
            {treasure.openingTime} - {treasure.closingTime}
          </span>
        </div>

        <p className="text-gray-700 mb-4 text-sm line-clamp-2 dark:text-white">
          {treasure.treasureDescription}
        </p>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100 ">
          <div className="flex items-center text-gray-600 dark:text-white">
            <User size={16} className="mr-1" />
            <span className="text-sm font-medium">
              {treasure.owner.userName}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center text-gray-600 dark:text-white">
              <Eye size={16} className="mr-1" />
              <span className="text-sm">{treasure.visitors}</span>
            </div>

            <button
              onClick={handleDeleteClick}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Delete treasure"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Delete Treasure
            </h3>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete "{treasure.treasureName}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreasureCard;
