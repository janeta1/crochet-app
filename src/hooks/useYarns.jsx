import { useState, useEffect } from "react";
import { sampleYarns } from "../data/sampleYarns";

export function useYarns() {
  const [yarns, setYarns] = useState(sampleYarns);

  function handleDeleteYarn(yarnId) {
    setYarns(yarns.filter((y) => y.id !== yarnId));
  }

  function handleAddYarn(formData) {
    const newYarn = {
      id: Date.now().toString(),
      name: formData.name,
      brand: formData.brand,
      weight: formData.weight,
      quantity: formData.quantity,
      color: formData.color,
      isFavorite: false,
    };
    setYarns([...yarns, newYarn]);
  }

  function handleEditYarn(yarnId, updatedData) {
    setYarns(
      yarns.map((y) => (y.id === yarnId ? { ...y, ...updatedData } : y)),
    );
  }

  function toggleFavorite(yarnId) {
    setYarns(
      yarns.map((y) =>
        y.id === yarnId ? { ...y, isFavorite: !y.isFavorite } : y,
      ),
    );
  }

  return {
    yarns,
    handleDeleteYarn,
    handleAddYarn,
    handleEditYarn,
    toggleFavorite,
  };
}
