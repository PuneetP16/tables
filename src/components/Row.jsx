import PropTypes from "prop-types";
import useRowState from "../hooks/useRowState";

const Row = ({ row, onUpdate, rows, level }) => {
  const {
    inputValue,
    setInputValue,
    handleAllocationPercentage,
    handleAllocationValue,
  } = useRowState(row, onUpdate, rows);

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
