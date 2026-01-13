import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';

const TaskCard = ({ task, onDelete, onEdit, onMove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div {...attributes} {...listeners} className="cursor-move">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 flex-1">{task.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
        
        {task.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
        )}
        
        {task.due_date && (
          <div className="text-xs text-gray-500 mb-3">
            Due: {format(new Date(task.due_date), 'MMM dd, yyyy')}
          </div>
        )}
      </div>
      
      <div className="flex gap-2 pt-2 border-t border-gray-100 items-center flex-wrap">
        <button
          onClick={() => onEdit(task)}
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-red-600 hover:text-red-800 hover:underline cursor-pointer"
        >
          Delete
        </button>
        
        {/* Mobile quick-move buttons */}
        <div className="sm:hidden flex gap-1 ml-auto text-xs">
          {task.status !== 'pending' && (
            <button
              onClick={() => onMove(task, 'pending')}
              className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
              title="Move to Pending"
            >
              ⏸
            </button>
          )}
          {task.status !== 'in-progress' && (
            <button
              onClick={() => onMove(task, 'in-progress')}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              title="Move to In Progress"
            >
              ▶
            </button>
          )}
          {task.status !== 'completed' && (
            <button
              onClick={() => onMove(task, 'completed')}
              className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
              title="Move to Completed"
            >
              ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;