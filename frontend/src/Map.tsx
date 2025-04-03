import React, { useState, useRef, useEffect } from 'react';

// Typdefinitionen
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
    type: 'single' | 'table';
    occupied: boolean;
}

type DeskType = 'single' | 'table';

const OfficeSpaceManagement: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([
        { id: 1, name: 'Living Room', selected: true },
        { id: 2, name: 'Bedroom', selected: false },
        { id: 3, name: 'Dining Room', selected: false },
        { id: 4, name: 'Home Office', selected: false },
    ]);

    const [floorPlan, setFloorPlan] = useState<FloorPlan>({
        points: [
            { x: 200, y: 100 },
            { x: 650, y: 100 },
            { x: 650, y: 450 },
            { x: 200, y: 300 },
        ],
        width: 800,
        height: 600
    });

    const [desks, setDesks] = useState<Desk[]>([]);
    const [selectedDesk, setSelectedDesk] = useState<number | null>(null);
    const [deskType, setDeskType] = useState<DeskType>('single');
    const [isCreatingDesk, setIsCreatingDesk] = useState<boolean>(false);
    const [zoom, setZoom] = useState<number>(100);

    // Drag state
    const [draggedItem, setDraggedItem] = useState<{ type: 'vertex' | 'desk', index: number } | null>(null);
    const [initialDragPoint, setInitialDragPoint] = useState<Point | null>(null);

    const canvasRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse move handler for dragging
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent): void => {
            if (draggedItem && initialDragPoint && canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const newX = e.clientX - rect.left;
                const newY = e.clientY - rect.top;

                const deltaX = newX - initialDragPoint.x;
                const deltaY = newY - initialDragPoint.y;

                if (draggedItem.type === 'vertex') {
                    // Update vertex position
                    const newPoints = [...floorPlan.points];
                    newPoints[draggedItem.index] = {
                        x: newX,
                        y: newY
                    };
                    setFloorPlan({
                        ...floorPlan,
                        points: newPoints
                    });
                    setInitialDragPoint({ x: newX, y: newY });
                } else if (draggedItem.type === 'desk') {
                    // Update desk position
                    const updatedDesks = [...desks];
                    const desk = updatedDesks[draggedItem.index];
                    updatedDesks[draggedItem.index] = {
                        ...desk,
                        x: desk.x + deltaX,
                        y: desk.y + deltaY
                    };
                    setDesks(updatedDesks);
                    setInitialDragPoint({ x: newX, y: newY });
                }
            }
        };

        const handleMouseUp = (): void => {
            setDraggedItem(null);
            setInitialDragPoint(null);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggedItem, initialDragPoint, floorPlan, desks]);

    // Select a room
    const selectRoom = (id: number): void => {
        setRooms(rooms.map(room => ({
            ...room,
            selected: room.id === id
        })));
    };

    // Calculate polygon path for SVG
    const getPolygonPoints = (): string => {
        return floorPlan.points.map(point => `${point.x},${point.y}`).join(' ');
    };

    // Add desk to the floor plan
    const addDesk = (x: number, y: number): void => {
        const newDesk: Desk = {
            id: Date.now(),
            x: x,
            y: y,
            width: deskType === 'single' ? 60 : 120,
            height: deskType === 'single' ? 40 : 60,
            type: deskType,
            occupied: false
        };
        setDesks([...desks, newDesk]);
        setIsCreatingDesk(false);
    };

    // Handle desk status toggle
    const toggleDeskStatus = (id: number): void => {
        setDesks(desks.map(desk =>
            desk.id === id ? { ...desk, occupied: !desk.occupied } : desk
        ));
    };

    // Handle canvas click to place desk
    const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>): void => {
        if (isCreatingDesk && canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            addDesk(x, y);
        } else if (selectedDesk) {
            setSelectedDesk(null);
        }
    };

    // Start dragging a vertex
    const startVertexDrag = (e: React.MouseEvent, index: number): void => {
        e.stopPropagation();
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setDraggedItem({ type: 'vertex', index });
            setInitialDragPoint({ x, y });
        }
    };

    // Start dragging a desk
    const startDeskDrag = (e: React.MouseEvent, desk: Desk): void => {
        e.stopPropagation();
        const deskIndex = desks.findIndex(d => d.id === desk.id);
        if (deskIndex !== -1 && canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setDraggedItem({ type: 'desk', index: deskIndex });
            setInitialDragPoint({ x, y });
            setSelectedDesk(desk.id);
        }
    };

    // Select desk when clicked
    const handleDeskClick = (e: React.MouseEvent, desk: Desk): void => {
        e.stopPropagation();
        setSelectedDesk(desk.id);
    };

    // Update zoom level
    const handleZoom = (newZoom: number): void => {
        setZoom(newZoom);
    };

    // Add a vertex to floor plan
    const addVertex = (): void => {
        if (floorPlan.points.length < 8) {
            const lastPoint = floorPlan.points[floorPlan.points.length - 1];
            const newPoint: Point = { x: lastPoint.x + 50, y: lastPoint.y + 50 };
            setFloorPlan({
                ...floorPlan,
                points: [...floorPlan.points, newPoint]
            });
        }
    };

    // Remove a room from the sidebar
    const removeRoom = (id: number): void => {
        setRooms(rooms.filter(room => room.id !== id));
    };

    // Add a new room to the sidebar
    const addRoom = (): void => {
        const newRoomId = Math.max(...rooms.map(r => r.id)) + 1;
        setRooms([...rooms, { id: newRoomId, name: 'New Room', selected: false }]);
    };

    // Calculate length between two points
    const calculateLength = (p1: Point, p2: Point): number => {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    // Calculate angle between two points (in degrees)
    const calculateAngle = (p1: Point, p2: Point): number => {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.atan2(dy, dx) * 180 / Math.PI;
    };

    return (
        <div className="flex h-screen w-full">
            {/* Sidebar */}
            <div className="w-64 bg-gray-100 border-r overflow-y-auto">
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Rooms</h2>
                    <ul className="space-y-1">
                        {rooms.map((room) => (
                            <li
                                key={room.id}
                                className={`p-2 cursor-pointer rounded flex justify-between items-center ${room.selected ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                                onClick={() => selectRoom(room.id)}
                            >
                                <span>{room.name}</span>
                                <button
                                    className="text-gray-500 hover:text-red-500"
                                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); removeRoom(room.id); }}
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-4 border-t">
                    <h2 className="text-lg font-semibold mb-4">Desk Types</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            className={`p-2 border rounded text-center cursor-pointer ${deskType === 'single' ? 'border-blue-500 bg-blue-50' : ''}`}
                            onClick={() => setDeskType('single')}
                        >
                            <div className="w-16 h-10 mx-auto border border-gray-400 mb-2"></div>
                            <div>Single Desk</div>
                        </div>
                        <div
                            className={`p-2 border rounded text-center cursor-pointer ${deskType === 'table' ? 'border-blue-500 bg-blue-50' : ''}`}
                            onClick={() => setDeskType('table')}
                        >
                            <div className="w-20 h-12 mx-auto border border-gray-400 mb-2"></div>
                            <div>Table Desk</div>
                        </div>
                    </div>
                    <button
                        className={`mt-4 w-full py-2 rounded ${isCreatingDesk ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                        onClick={() => setIsCreatingDesk(!isCreatingDesk)}
                    >
                        {isCreatingDesk ? 'Cancel' : 'Add Desk'}
                    </button>
                </div>

                <div className="p-4 border-t">
                    <h2 className="text-lg font-semibold mb-2">Instructions</h2>
                    <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Click "Add Desk" and then click on the canvas to place a desk</li>
                        <li>• Drag room corners to reshape the room</li>
                        <li>• Drag desks to reposition them</li>
                        <li>• Click on the status indicator to toggle occupancy</li>
                    </ul>
                </div>
            </div>

            {/* Main Canvas */}
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
                        <button
                            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={addVertex}
                        >
                            Add Vertex
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
                            transformOrigin: '0 0',
                            cursor: isCreatingDesk ? 'crosshair' : 'default'
                        }}
                    >
                        <svg
                            ref={canvasRef}
                            width={floorPlan.width}
                            height={floorPlan.height}
                            onClick={handleCanvasClick}
                            className="bg-white"
                        >
                            {/* Floor Plan */}
                            <polygon
                                points={getPolygonPoints()}
                                fill="white"
                                stroke="black"
                                strokeWidth="2"
                            />

                            {/* Dimensions */}
                            {floorPlan.points.map((point, i) => {
                                const nextPoint = floorPlan.points[(i + 1) % floorPlan.points.length];
                                const midX = (point.x + nextPoint.x) / 2;
                                const midY = (point.y + nextPoint.y) / 2;
                                const length = calculateLength(point, nextPoint);
                                const angle = calculateAngle(point, nextPoint);

                                return (
                                    <g key={`dim-${i}`}>
                                        <text
                                            x={midX}
                                            y={midY}
                                            textAnchor="middle"
                                            transform={`rotate(${angle}, ${midX}, ${midY})`}
                                            dy="-5"
                                            fontSize="12"
                                        >
                                            {Math.round(length)}"
                                        </text>
                                    </g>
                                );
                            })}

                            {/* Desks */}
                            {desks.map((desk, index) => (
                                <g
                                    key={desk.id}
                                    onClick={(e: React.MouseEvent) => handleDeskClick(e, desk)}
                                    onMouseDown={(e: React.MouseEvent) => startDeskDrag(e, desk)}
                                    style={{ cursor: 'move' }}
                                >
                                    <rect
                                        x={desk.x}
                                        y={desk.y}
                                        width={desk.width}
                                        height={desk.height}
                                        fill="white"
                                        stroke={selectedDesk === desk.id ? 'blue' : 'black'}
                                        strokeWidth={selectedDesk === desk.id ? 3 : 1}
                                    />
                                    <circle
                                        cx={desk.x + desk.width - 10}
                                        cy={desk.y + 10}
                                        r={6}
                                        fill={desk.occupied ? 'red' : 'green'}
                                        stroke="black"
                                        strokeWidth="1"
                                        onClick={(e: React.MouseEvent) => { e.stopPropagation(); toggleDeskStatus(desk.id); }}
                                    />
                                    {/* Desk type label */}
                                    <text
                                        x={desk.x + desk.width / 2}
                                        y={desk.y + desk.height / 2}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize="10"
                                        pointerEvents="none"
                                    >
                                        {desk.type === 'single' ? 'Single' : 'Table'}
                                    </text>
                                </g>
                            ))}

                            {floorPlan.points.map((point, index) => (
                                <circle
                                    key={`vertex-${index}`}
                                    cx={point.x}
                                    cy={point.y}
                                    r={8}
                                    fill={draggedItem?.type === 'vertex' && draggedItem.index === index ? 'blue' : 'red'}
                                    opacity={0.7}
                                    cursor="move"
                                    onMouseDown={(e: React.MouseEvent) => startVertexDrag(e, index)}
                                />
                            ))}
                        </svg>
                    </div>
                </div>

                <div className="p-4 border-t bg-gray-100">
                    <div className="flex justify-between">
                        <div>
              <span className="mr-4">
                <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-1"></span> Free
              </span>
                            <span>
                <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-1"></span> Occupied
              </span>
                        </div>
                        <div>
                            Total Desks: {desks.length} | Occupied: {desks.filter(d => d.occupied).length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfficeSpaceManagement;