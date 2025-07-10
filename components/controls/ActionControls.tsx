export default function ActionControls({ 
  actions, 
  setActions 
}: { 
  actions: number;
  setActions: (actions: number) => void;
}) {
  const handleIncrement = () => setActions(actions + 1)
  const handleDecrement = () => setActions(Math.max(0, actions - 1))
  
  return (
    <div className="border rounded-[12px] p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">📌 Pending actions</h3>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleDecrement}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            disabled={actions === 0}
          >
            -
          </button>
          <span className="text-lg">{actions}</span>
          <button 
            onClick={handleIncrement}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
} 