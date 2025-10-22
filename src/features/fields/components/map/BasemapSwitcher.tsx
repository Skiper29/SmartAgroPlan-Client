import React from 'react';

export interface BasemapDef {
  id: string;
  name: string;
  previewUrl: string; // static tile sample for thumbnail
  hasLabels?: boolean; // whether this basemap supports an optional labels overlay
}

interface BasemapSwitcherProps {
  basemaps: BasemapDef[];
  selectedId: string;
  onSelect: (id: string) => void;
  showLabels: boolean;
  canToggleLabels: boolean;
  onToggleLabels: (val: boolean) => void;
  className?: string;
}

const BasemapSwitcher: React.FC<BasemapSwitcherProps> = ({
  basemaps,
  selectedId,
  onSelect,
  showLabels,
  canToggleLabels,
  onToggleLabels,
  className,
}) => {
  return (
    <div
      className={`absolute bottom-4 left-4 z-[1000] ${className ?? ''}`.trim()}
    >
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 w-[260px]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
            Base map
          </h4>
          {canToggleLabels && (
            <label className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showLabels}
                onChange={(e) => onToggleLabels(e.target.checked)}
                className="accent-green-600"
              />
              Labels
            </label>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {basemaps.map((bm) => {
            const isActive = bm.id === selectedId;
            return (
              <button
                key={bm.id}
                onClick={() => onSelect(bm.id)}
                className={`group rounded-md overflow-hidden border relative text-left ${
                  isActive
                    ? 'border-green-500 ring-2 ring-green-500/40'
                    : 'border-gray-200 dark:border-gray-700 hover:border-green-400'
                }`}
                aria-pressed={isActive}
              >
                <img
                  src={bm.previewUrl}
                  alt={bm.name}
                  className="w-full h-20 object-cover"
                  loading="lazy"
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 px-2 py-1 text-xs ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'bg-black/50 text-white'
                  }`}
                >
                  {bm.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BasemapSwitcher;
