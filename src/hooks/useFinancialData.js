import { useState, useEffect, useMemo } from "react";
import { calculateTotalsAndVariance } from "../utils/calculations";

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

const useFinancialData = () => {
  const [data, setData] = useState({ rows: [] });

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

  return { data, handleUpdate, grandTotal };
};

export default useFinancialData;
