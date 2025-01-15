import { useState } from "react";
import PropTypes from "prop-types";

const Row = ({ row, onUpdate, rows, level }) => {
  const [inputValue, setInputValue] = useState("");
  const isLeaf = !row.children;

  const calculateVariance = (newValue, originalValue) => {
    if (originalValue === 0) return 0;
    return ((newValue - originalValue) / originalValue) * 100;
  };

  const updateRowValue = (currentRows, rowId, newValue) => {
    return currentRows.map((r) => {
      if (r.id === rowId) {
        const newVariance = calculateVariance(newValue, r.baseValue);
        return { ...r, value: newValue, variance: newVariance };
      } else if (r.children) {
        const updatedChildren = updateRowValue(r.children, rowId, newValue);
        const newValueSum = updatedChildren.reduce(
          (sum, child) => sum + child.value,
          0
        );
        const newVariance = calculateVariance(newValueSum, r.baseValue);
        return {
          ...r,
          value: newValueSum,
          variance: newVariance,
          children: updatedChildren,
        };
      }
      return r;
    });
  };

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
      if (isLeaf) {
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

  const paddingLeft = { paddingLeft: `${level * 20}px` };

  return (
    <>
      <tr>
        <td className="border px-4 py-2" style={paddingLeft}>
          {row.label}
        </td>
        <td className="border px-4 py-2 text-right">{row.value.toFixed(2)}</td>
        <td className="border px-4 py-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-24 text-right"
          />
        </td>
        <td className="border px-4 py-2">
          <button
            onClick={handleAllocationPercentage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-full"
          >
            %
          </button>
        </td>
        <td className="border px-4 py-2">
          <button
            onClick={handleAllocationValue}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded w-full"
          >
            Val
          </button>
        </td>
        <td className="border px-4 py-2 text-right">
          {row.variance ? row.variance.toFixed(2) : "0.00"}%
        </td>
      </tr>
      {row.children &&
        row.children.map((child) => (
          <Row
            key={child.id}
            row={child}
            onUpdate={onUpdate}
            rows={rows}
            level={level + 1}
          />
        ))}
    </>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    baseValue: PropTypes.number,
    variance: PropTypes.number,
    children: PropTypes.array,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  level: PropTypes.number.isRequired,
};

export default Row;
