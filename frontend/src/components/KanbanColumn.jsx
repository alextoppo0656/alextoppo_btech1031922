import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const KanbanColumn = ({ title, status, tasks, onDelete, onEdit }) => {
  const { setNodeRef } = useDroppable({ id: status });

  const getColumnColor = (status) => {
    switch (status) {
      case 'pending':
        return 'border-yellow-300 bg-yellow-50';
      case 'in-progress':
        return 'border-blue-300 bg-blue-50';
      case 'completed':
        return 'border-green-300 bg-green-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className={`flex-1 min-w-[300px] border-2 rounded-lg p-4 ${getColumnColor(status)}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <span className="bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-700">
          {tasks.length}
        </span>
      </div>
      
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="space-y-3 min-h-[200px]">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No tasks yet
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default KanbanColumn;
