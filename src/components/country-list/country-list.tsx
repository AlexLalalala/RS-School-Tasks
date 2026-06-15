import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';
import { useMemo } from 'react';
import { List, type RowComponentProps } from 'react-window';

interface RowProps{
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
}

const Row = ({index, style, countries, selectedYear, selectedColumns}: RowComponentProps<RowProps>) => {
  const country = countries[index];

  return (
    <div style={style}>
      <CountryCard country={country} selectedYear={selectedYear} selectedColumns={selectedColumns}/>
    </div>
  )
}

const rowHeight = (columnsNumber: number) => {
  return 128 + 38 * columnsNumber
}

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const filteredCountries = useMemo(()=>countries
    .filter((c) => {
      const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
      return matchesSearch && matchesRegion;
  }), [countries, searchQuery, selectedRegion])
  const sortedCountries = useMemo(()=>[...filteredCountries].sort((a, b) => {
    if (sortField === 'name') {
      return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    } else {
      const popA = getPopulationForYear(createYearDataMap(a.data), selectedYear) || 0;
      const popB = getPopulationForYear(createYearDataMap(b.data), selectedYear) || 0;
      return sortOrder === 'asc' ? popA - popB : popB - popA;
    }
  }), [filteredCountries, sortField, sortOrder, selectedYear]);

  return (
    <div className={styles.countryList}>
      {sortedCountries.length < 10 ? 
      sortedCountries.map((country) => (
      <CountryCard 
        key={country.id} 
        country={country} 
        selectedYear={selectedYear} 
        selectedColumns={selectedColumns}/>)
    ) : (
    <List 
      rowCount={sortedCountries.length} 
      rowHeight={rowHeight(selectedColumns.length)} 
      rowComponent={Row} 
      rowProps={{
        countries:sortedCountries,
        selectedYear:selectedYear,
        selectedColumns:selectedColumns}}/>)
      }
    </div>
  );
};
