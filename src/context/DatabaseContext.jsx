import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

const DatabaseContext = createContext();

export const useDatabaseContext = () => useContext(DatabaseContext);

export const DatabaseProvider = ({ children }) => {
  const [databases, setDatabases] = useState([]);
  const [currentDatabase, setCurrentDatabase] = useState(null);
  const [tables, setTables] = useState([]);
  const [currentTable, setCurrentTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 9, total: 0, totalPages: 0 });

  const fetchDatabases = useCallback(async (page = 1, limit = 9, search = '', sortBy = 'createdAt', order = 'desc') => {
    setLoading(true);
    try {
      const response = await api.get(`/databases?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&order=${order}`);
      setDatabases(response.data.databases);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch databases');
    } finally {
      setLoading(false);
    }
  }, []);

  const createDatabase = async (name, description) => {
    setLoading(true);
    try {
      const response = await api.post('/databases', { name, description });
      setDatabases((prev) => [response.data, ...prev]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create database');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchDatabaseById = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/databases/${id}`);
      setCurrentDatabase(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch database');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDatabase = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/databases/${id}`);
      setDatabases((prev) => prev.filter((db) => db.id !== id));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete database');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchTables = useCallback(async (databaseId, page = 1, limit = 9, search = '', sortBy = 'createdAt', order = 'desc') => {
    setLoading(true);
    try {
      const response = await api.get(`/tables?databaseId=${databaseId}&page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&order=${order}`);
      setTables(response.data.tables);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tables');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTable = async (databaseId, name, columns) => {
    setLoading(true);
    try {
      const response = await api.post('/tables', { databaseId, name, columns });
      setTables((prev) => [response.data, ...prev]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create table');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTable = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/tables/${id}`);
      setTables((prev) => prev.filter((table) => table.id !== id));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete table');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    databases,
    currentDatabase,
    tables,
    currentTable,
    loading,
    error,
    pagination,
    fetchDatabases,
    createDatabase,
    fetchDatabaseById,
    deleteDatabase,
    fetchTables,
    createTable,
    deleteTable
  };

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};
