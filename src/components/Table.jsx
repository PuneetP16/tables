import PropTypes from "prop-types";
import Row from "./Row";

const Table = ({ rows, onUpdate, grandTotal }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Label</th>
          <th className="px-4 py-2 text-right">Value</th>
          <th className="px-4 py-2">Input</th>
          <th className="px-4 py-2">Allocation %</th>
          <th className="px-4 py-2">Allocation Val</th>
          <th className="px-4 py-2 text-right">Variance %</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <Row
            key={row.id}
            row={row}
            onUpdate={onUpdate}
            rows={rows}
            level={0}
          />
        ))}
        <tr>
          <td className="border px-4 py-2 font-bold">Grand Total</td>
          <td className="border px-4 py-2 font-bold text-right">
            {grandTotal.toFixed(2)}
          </td>
          <td colSpan="4"></td>
        </tr>
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  rows: [],
  onUpdate: () => {},
  grandTotal: 0,
};

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  onUpdate: PropTypes.func,
  grandTotal: PropTypes.number,
};

export default Table;
