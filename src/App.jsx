import { useState, useEffect, useMemo } from "react";
import Table from "./components/Table";

const initialData = {
  rows: [
    {
      id: "electronics",
      label: "Electronics",
      value: 1500,
      children: [
        {
          id: "phones",
          label: "Phones",
          value: 800,
        },
        {
          id: "laptops",
          label: "Laptops",
          value: 700,
        },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000,
      children: [
        {
          id: "tables",
          label: "Tables",
          value: 300,
        },
        {
          id: "chairs",
          label: "Chairs",
          value: 700,
        },
      ],
    },
  ],
};

function App() {
  const [data, setData] = useState({ rows: [] });

  const calculateTotalsAndVariance = (rows, baseRows = rows) => {
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

  useEffect(() => {
    const updatedRows = calculateTotalsAndVariance(initialData.rows);
    setData({ rows: updatedRows });
  }, []);

  const grandTotal = useMemo(() => {
    return data.rows.reduce((sum, row) => sum + row.value, 0);
  }, [data]);

  const handleUpdate = (updatedRows) => {
    const recalculatedRows = calculateTotalsAndVariance(
      updatedRows,
      initialData.rows
    );
    setData({ rows: recalculatedRows });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Financial Data Table</h1>
      <Table rows={data.rows} onUpdate={handleUpdate} grandTotal={grandTotal} />
    </div>
  );
}

export default App;
