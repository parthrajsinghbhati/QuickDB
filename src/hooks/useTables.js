import { useDatabaseContext } from '../context/DatabaseContext';

const useTables = () => {
  const {
    tables,
    currentTable,
    loading,
    error,
    pagination,
    fetchTables,
    createTable,
    deleteTable
  } = useDatabaseContext();

  return {
    tables,
    currentTable,
    loading,
    error,
    pagination,
    fetchTables,
    createTable,
    deleteTable
  };
};

export default useTables;
