import { useState, useEffect } from "react";
import { sampleYarns } from "../data/sampleYarns";
import { getAllYarns, saveYarn, deleteYarn } from "../db/database";

export function useYarns() {
  const [yarns, setYarns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadYarns() {
      const stored = await getAllYarns();
      setYarns(stored);
      setLoading(false);
    }
    loadYarns();
  }, []);

  async function handleDeleteYarn(yarnId) {
    await deleteYarn(yarnId);
    setYarns((prev) => prev.filter((y) => y.id !== yarnId));
  }

  async function handleAddYarn(formData) {
    const newYarn = {
      id: Date.now().toString(),
      name: formData.name,
      brand: formData.brand,
      weight: formData.weight,
      quantity: formData.quantity,
      color: formData.color,
      isFavorite: false,
    };
    await saveYarn(newYarn);
    setYarns((prev) => [...prev, newYarn]);
  }

  async function handleEditYarn(yarnId, updatedData) {
    const yarn = yarns.find((y) => y.id === yarnId);
    const updatedYarn = { ...yarn, ...updatedData };
    await saveYarn(updatedYarn);
    setYarns((prev) =>
      prev.map((y) => (y.id === yarnId ? { ...y, ...updatedData } : y)),
    );
  }

  async function toggleFavorite(yarnId) {
    const yarn = yarns.find((y) => y.id === yarnId);
    const updated = { ...yarn, isFavorite: !yarn.isFavorite };
    await saveYarn(updated);
    setYarns((prev) => prev.map((y) => (y.id === yarnId ? updated : y)));
  }

  return {
    yarns,
    loading,
    handleDeleteYarn,
    handleAddYarn,
    handleEditYarn,
    toggleFavorite,
  };
}
