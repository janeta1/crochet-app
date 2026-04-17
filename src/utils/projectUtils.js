export function calculateProgress(project) {
  const totalRows = project.parts.reduce(
    (sum, part) => sum + part.totalRows,
    0,
  );
  const completedRows = project.parts.reduce(
    (sum, part) => sum + part.completedRows,
    0,
  );

  if (totalRows === 0) return 0;
  return Math.round((completedRows / totalRows) * 100);
}
