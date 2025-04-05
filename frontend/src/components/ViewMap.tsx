import React, { useState, useRef, useEffect } from "react";

interface Room {
  id: number;
  name: string;
  selected: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface FloorPlan {
  points: Point[];
  width: number;
  height: number;
}

interface Desk {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "single" | "table";
  occupied: boolean;
}

type DeskType = "single" | "table";

const ViewMap: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, name: "Living Room", selected: true },
    { id: 2, name: "Bedroom", selected: false },
    { id: 3, name: "Dining Room", selected: false },
    { id: 4, name: "Home Office", selected: false },
  ]);

  const [floorPlan, setFloorPlan] = useState<FloorPlan>({
    points: [
      { x: 200, y: 100 },
      { x: 650, y: 100 },
      { x: 650, y: 450 },
      { x: 200, y: 300 },
    ],
    width: 800,
    height: 600,
  });

  const [desks, setDesks] = useState<Desk[]>([]);
  const [deskType, setDeskType] = useState<DeskType>("single");
  const [zoom, setZoom] = useState<number>(100);

  const canvasRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectRoom = (id: number): void => {
    setRooms(
      rooms.map((room) => ({
        ...room,
        selected: room.id === id,
      }))
    );
  };

  const getPolygonPoints = (): string => {
    return floorPlan.points.map((point) => `${point.x},${point.y}`).join(" ");
  };

  useEffect(() => {
    setDesks((currentDesks) => {
      const hasDefaultDesk = currentDesks.some((d) => d.id === 1);
      if (!hasDefaultDesk) {
        const defaultDesk: Desk = {
          id: 1,
          x: 400,
          y: 200,
          width: 60,
          height: 40,
          type: "single",
          occupied: false,
        };
        return [...currentDesks, defaultDesk];
      }
      return currentDesks;
    });
  }, []);

  const toggleDeskStatus = (id: number): void => {
    setDesks(
      desks.map((desk) =>
        desk.id === id ? { ...desk, occupied: !desk.occupied } : desk
      )
    );
  };

  const handleZoom = (newZoom: number): void => {
    setZoom(newZoom);
  };

  return (
    <div className="flex h-150% w-full">
      <div className="flex-1 bg-white overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold">Office Space Planner</h1>
          <div className="flex items-center">
            <button
              className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
              onClick={() => handleZoom(Math.max(50, zoom - 10))}
            >
              -
            </button>
            <span className="px-3 py-1 bg-gray-100">{zoom}%</span>
            <button
              className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
              onClick={() => handleZoom(Math.min(200, zoom + 10))}
            >
              +
            </button>
          </div>
        </div>

        <div
          className="flex-1 overflow-auto bg-gray-50 relative"
          ref={containerRef}
        >
          <div
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "0 0",
            }}
          >
            <svg
              ref={canvasRef}
              width={floorPlan.width}
              height={floorPlan.height}
              className="bg-white"
            >
              <polygon
                points={getPolygonPoints()}
                fill="white"
                stroke="black"
                strokeWidth="2"
              />
              {desks.map((desk, index) => (
                <g key={desk.id}>
                  <rect
                    x={desk.x}
                    y={desk.y}
                    width={desk.width}
                    height={desk.height}
                    fill="white"
                    stroke="black"
                    strokeWidth={1}
                  />
                  <circle
                    cx={desk.x + desk.width - 10}
                    cy={desk.y + 10}
                    r={6}
                    fill={desk.occupied ? "red" : "green"}
                    cursor= "pointer"
                    stroke="black"
                    strokeWidth="1"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      toggleDeskStatus(desk.id);
                    }}
                  />
                  <text
                    x={desk.x + desk.width / 2}
                    y={desk.y + desk.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="10"
                    pointerEvents="none"
                  >
                    {desk.type === "single" ? "Single" : "Table"}
                  </text>
                </g>
              ))}

              {floorPlan.points.map((point, index) => (
                <circle key={`vertex-${index}`} opacity={0.7} cursor="move" />
              ))}
            </svg>
          </div>
        </div>
        <div className="p-4 border-t bg-gray-100">
          <div className="flex justify-between">
            <div>
              <span className="mr-4">
                <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-1"></span>{" "}
                Free
              </span>
              <span>
                <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-1"></span>{" "}
                Occupied
              </span>
            </div>
            <div>
              Total Desks: {desks.length} | Occupied:{" "}
              {desks.filter((d) => d.occupied).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMap;
