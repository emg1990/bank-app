import React from 'react';
import { Input } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const onCloseSearch = () => {
    setIsExpanded(false);
    onSearch('');
  }

  if (isExpanded) {
    return (
      <div className={styles.searchInput}>
        <Input
          placeholder="Search"
          onChange={e => onSearch(e.target.value)}
          onBlur={onCloseSearch}
          autoFocus
          suffix={<CloseOutlined onClick={onCloseSearch} data-testid="close-icon"/>}
          data-testid="search-input"
        />
      </div>
    );
  }
  return (
    <SearchOutlined onClick={() => setIsExpanded(true)} data-testid="search-icon"/>
  );
};

export default Search;