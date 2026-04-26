export function calculateProgress(project) {
  if (!project.parts || project.parts.length === 0) return 0;

  const totalWork = project.parts.reduce((sum, part) => {
    const qty = parseInt(part.quantity);
    const rows = parseInt(part.totalRows);
    if (qty > 1) return sum + qty;
    return sum + rows;
  }, 0);

  const completedWork = project.parts.reduce(
    (sum, part) => sum + (parseInt(part.completedRows) || 0),
    0,
  );

  if (totalWork === 0) return 0;
  return Math.round((completedWork / totalWork) * 100);
}
