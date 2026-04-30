export default function ProjectCard({ project }) {
  return (
    <div style={{
      border: "1px solid #aaa",
      padding: "10px",
      margin: "10px",
      borderRadius: "8px"
    }}>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </div>
  );
}