import Table from "./components/Table";
import useFinancialData from "./hooks/useFinancialData";

function App() {
  const { data, handleUpdate, grandTotal } = useFinancialData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Financial Data Table</h1>
      <Table rows={data.rows} onUpdate={handleUpdate} grandTotal={grandTotal} />
    </div>
  );
}

export default App;
