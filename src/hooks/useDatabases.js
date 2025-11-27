import { useDatabaseContext } from '../context/DatabaseContext';

const useDatabases = () => {
  const {
    databases,
    currentDatabase,
    loading,
    error,
    pagination,
    fetchDatabases,
    createDatabase,
    fetchDatabaseById,
    deleteDatabase
  } = useDatabaseContext();

  return {
    databases,
    currentDatabase,
    loading,
    error,
    pagination,
    fetchDatabases,
    createDatabase,
    fetchDatabaseById,
    deleteDatabase
  };
};

export default useDatabases;
