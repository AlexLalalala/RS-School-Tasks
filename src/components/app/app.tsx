import { useCallback, useMemo, useReducer } from 'react';
import { useCo2Data } from '../../hooks/useCo2Data';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { SearchBar } from '../search-bar/search-bar';
import { YearSelector } from '../year-selector/year-selector';
import { CountryList } from '../country-list/country-list';
import { getAvailableYears, getAvailableColumns } from '../../utils/data-transformers';
import styles from './app.module.css';
import ColumnModal from '../column-modal/column-modal';


type AppState = {
  searchQuery: string;
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  selectedColumns: string[];
  isColumnModalOpen: boolean;
};

type ReducerAction =
  | { type: 'setSearchQuery'; value: string }
  | { type: 'setSelectedRegion'; value: string }
  | { type: 'setSelectedYear'; value: number }
  | { type: 'setSortField'; value: 'name' | 'population' }
  | { type: 'toggleOrder' }
  | { type: 'toggleSelectedColumn'; column: string }
  | { type: 'toggleColumnModalOpen' };


const stateReducer = (state: AppState, action: ReducerAction): AppState => {
  switch (action.type){
    case 'setSearchQuery':{
      return {...state, searchQuery: action.value}
    }
    case 'setSelectedRegion':{
      return {...state, selectedRegion: action.value}
    }
    case 'setSelectedYear':{
      return {...state, selectedYear: action.value}
    }
    case 'setSortField':{
      return {...state, sortField: action.value}
    }
    case 'toggleOrder':{
      return {...state, sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc'}
    }
    case 'toggleSelectedColumn':{
      return {
      ...state,
      selectedColumns: state.selectedColumns.includes(action.column)
        ? state.selectedColumns.filter((c) => c !== action.column)
        : [...state.selectedColumns, action.column],
    }
    }
    case 'toggleColumnModalOpen': {
      return { ...state, isColumnModalOpen: !state.isColumnModalOpen }
    }
  }
}

const initialState: AppState = {
    searchQuery: '',
    selectedRegion: '',
    selectedYear: 2020,
    sortField: 'population',
    sortOrder: 'desc',
    selectedColumns: ['year', 'population', 'co2', 'co2_per_capita'],
    isColumnModalOpen: false,
  }

export const App = () => {
  const { data, isLoading, error } = useCo2Data();

  const [state, dispatch] = useReducer(stateReducer, initialState)

  const years = useMemo(() => data ? getAvailableYears(data) : [], [data]);
  const availableColumns = useMemo(() => getAvailableColumns(), []);

  const handleSearch = useCallback((value: string) => {
    dispatch({type: 'setSearchQuery', value: value})
  }, []);

  const handleYearChange = useCallback((year: number) => {
    dispatch({type: 'setSelectedYear', value: year})
  }, []);

  const handleSortFieldChange = useCallback((field: 'name' | 'population') => {
    dispatch({type: 'setSortField', value: field})
  }, []);

  const handleSortOrderToggle = useCallback(() => {
    dispatch({type: 'toggleOrder'});
  }, []);

  const handleColumnToggle = useCallback((column: string) => {
    dispatch({type: 'toggleSelectedColumn', column: column})
  }, []);

  const handleModalToggle = useCallback(() => {
    dispatch({type: 'toggleColumnModalOpen'})
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className={styles.errorMessage}>Error: {error}</div>;
  }

  if (!data) {
    return <div className={styles.noDataMessage}>No data available</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CO₂ Emissions Data Explorer</h1>

      {/* Controls */}
      <div className={styles.controls}>
        <SearchBar value={state.searchQuery} onChange={handleSearch} />
        <YearSelector year={state.selectedYear} years={years} onChange={handleYearChange} />

        <div className={styles.sortContainer}>
          <label className={styles.sortLabel}>Sort by:</label>
          <select
            value={state.sortField}
            onChange={(e) => handleSortFieldChange(e.target.value as 'name' | 'population')}
            className={styles.sortSelect}
          >
            <option value="population">Population</option>
            <option value="name">Name</option>
          </select>

          <button onClick={handleSortOrderToggle} className={styles.sortButton}>
            {state.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>

        <div className={styles.columnButtonContainer}>
          <button onClick={handleModalToggle} className={styles.columnButton}>
            Select columns ({state.selectedColumns.length} selected)
          </button>
        </div>
      </div>

      {/* Country List */}
      <CountryList
        countries={data}
        searchQuery={state.searchQuery}
        selectedColumns={state.selectedColumns}
        selectedRegion={state.selectedRegion}
        selectedYear={state.selectedYear}
        sortField={state.sortField}
        sortOrder={state.sortOrder}
        onYearChange={handleYearChange}
      />

      {/* Column Modal */}
      <ColumnModal
        isOpen={state.isColumnModalOpen}
        availableColumns={availableColumns}
        selectedColumns={state.selectedColumns}
        onToggle={handleColumnToggle}
        onClose={handleModalToggle}
      />
    </div>
  );
};
