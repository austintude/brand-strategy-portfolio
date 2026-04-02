'use client';

interface Position {
  name: string;
  x: number;
  y: number;
}

interface CompetitiveMapProps {
  mapData: {
    xAxis: string;
    yAxis: string;
    positions: Position[];
  };
  targetCompany: string;
}

export default function CompetitiveMap({
  mapData,
  targetCompany,
}: CompetitiveMapProps) {
  if (!mapData) return null;

  const positions = mapData.positions || [];

  return (
    <div className="relative w-full">
      {/* Axis Labels */}
      <div className="flex justify-between mb-2 px-4">
        <span className="font-sans text-xs text-gray-400 uppercase tracking-wide">
          {mapData.xAxis?.split('--')[0]?.trim()}
        </span>
        <span className="font-sans text-xs text-gray-400 uppercase tracking-wide">
          {mapData.xAxis?.split('--')[1]?.trim()}
        </span>
      </div>

      {/* Map Container */}
      <div className="relative bg-gray-50 border border-gray-200 rounded-lg aspect-square max-w-lg mx-auto overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-dashed border-gray-300" />
        </div>
        <div className="absolute inset-0 flex justify-center">
          <div className="h-full border-l border-dashed border-gray-300" />
        </div>

        {/* Y axis labels */}
        <div className="absolute left-2 top-2 font-sans text-[10px] text-gray-400 uppercase tracking-wide">
          {mapData.yAxis?.split('--')[1]?.trim()}
        </div>
        <div className="absolute left-2 bottom-2 font-sans text-[10px] text-gray-400 uppercase tracking-wide">
          {mapData.yAxis?.split('--')[0]?.trim()}
        </div>

        {/* Dots */}
        <div className="relative w-full h-full p-8">
          {positions.map((company) => {
            const isTarget =
              company.name.toLowerCase() === targetCompany.toLowerCase();
            return (
              <div
                key={company.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${Math.max(10, Math.min(90, company.x))}%`,
                  top: `${Math.max(10, Math.min(90, 100 - company.y))}%`,
                }}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    isTarget ? 'bg-[#C2410C]' : 'bg-gray-400'
                  } shadow-sm`}
                />
                <span
                  className={`block text-center whitespace-nowrap text-xs font-sans font-medium mt-1 ${
                    isTarget ? 'text-[#C2410C]' : 'text-gray-500'
                  }`}
                >
                  {company.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#C2410C]" />
          <span className="font-sans text-sm text-gray-700">
            {targetCompany}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-400" />
          <span className="font-sans text-sm text-gray-500">Competitors</span>
        </div>
      </div>
    </div>
  );
}
