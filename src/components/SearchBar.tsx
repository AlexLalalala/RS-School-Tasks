'use client';

import { useState } from 'react';
import styles from './SearchBar.module.css';
import { useTranslations } from 'next-intl';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

function SearchBar({ onSearch, initialQuery }: SearchBarProps) {
  const t = useTranslations('SearchBar');
  const [query, setQuery] = useState(initialQuery || '');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form className={`w-75 mx-auto ${styles.SearchBar}`} onSubmit={onSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={t('placeholder')}
          aria-label="Search Query"
          aria-describedby="button-addon2"
          onChange={onChange}
          value={query}
        />
        <button
          className="btn btn-outline-primary"
          type="submit"
          id="button-addon2"
        >
          {t('searchButton')}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
