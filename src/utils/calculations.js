export const calculateTotalsAndVariance = (rows, baseRows = rows) => {
  return rows.map((row) => {
    const baseRow = baseRows.find((base) => base.id === row.id);
    const baseValue = baseRow ? baseRow.value : 0;

    if (row.children) {
      const calculatedChildren = calculateTotalsAndVariance(
        row.children,
        baseRow ? baseRow.children : []
      );
      const calculatedValue = calculatedChildren.reduce(
        (sum, child) => sum + child.value,
        0
      );
      const calculatedVariance =
        baseValue !== 0
          ? ((calculatedValue - baseValue) / baseValue) * 100
          : 0;
      return {
        ...row,
        value: calculatedValue,
        baseValue,
        variance: calculatedVariance,
        children: calculatedChildren,
      };
    } else {
      const calculatedVariance =
        baseValue !== 0 ? ((row.value - baseValue) / baseValue) * 100 : 0;
      return { ...row, baseValue, variance: calculatedVariance };
    }
  });
};

export const calculateVariance = (newValue, originalValue) => {
  if (originalValue === 0) return 0;
  return ((newValue - originalValue) / originalValue) * 100;
};

export const updateRowValue = (currentRows, rowId, newValue) => {
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
