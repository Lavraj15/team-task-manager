export default function TaskCard({ task, onUpdate }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      margin: "10px",
      padding: "10px",
      borderRadius: "8px"
    }}>
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Due: {new Date(task.dueDate).toDateString()}</p>

      <button onClick={() => onUpdate(task._id, "done")}>
        Mark Done
      </button>
    </div>
  );
}