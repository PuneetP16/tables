import { useState } from "react";
import { calculateVariance, updateRowValue } from "../utils/calculations";

const useRowState = (row, onUpdate, rows) => {
  const [inputValue, setInputValue] = useState("");

  const handleAllocationPercentage = () => {
    const percentage = parseFloat(inputValue);
    if (!isNaN(percentage)) {
      const newValue = row.value * (1 + percentage / 100);
      const updatedRows = updateRowValue(rows, row.id, newValue);
      onUpdate(updatedRows);
      setInputValue("");
    }
  };

  const handleAllocationValue = () => {
    const newValue = parseFloat(inputValue);
    if (!isNaN(newValue)) {
      if (!row.children) {
        const updatedRows = updateRowValue(rows, row.id, newValue);
        onUpdate(updatedRows);
      } else {
        distributeValueToLeaves(newValue);
      }
      setInputValue("");
    }
  };

  const distributeValueToLeaves = (newValue) => {
    const totalChildrenValue = row.children.reduce(
      (sum, child) => sum + child.value,
      0
    );
    const updatedChildren = row.children.map((child) => {
      const proportion =
        totalChildrenValue === 0 ? 0 : child.value / totalChildrenValue;
      const newChildValue = newValue * proportion;
      const newChildVariance = calculateVariance(
        newChildValue,
        child.baseValue
      );
      return { ...child, value: newChildValue, variance: newChildVariance };
    });

    const updatedRows = rows.map((r) => {
      if (r.id === row.id) {
        const newVariance = calculateVariance(newValue, r.baseValue);
        return {
          ...r,
          value: newValue,
          variance: newVariance,
          children: updatedChildren,
        };
      }
      return r;
    });

    onUpdate(updatedRows);
  };

  return {
    inputValue,
    setInputValue,
    handleAllocationPercentage,
    handleAllocationValue,
  };
};

export default useRowState;
