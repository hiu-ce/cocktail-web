import { Autocomplete, Button } from '@mantine/core';
import { useState } from 'react';
import { SearchItem } from '../lib/types';

interface Props {
  searchItem: SearchItem;
}
export default function SearchBar({ searchItem }: Props) {
  const [value, setValue] = useState<string>('');

  return (
    <div>
      <Autocomplete
        dropdownComponent="div"
        maxDropdownHeight="30vh"
        limit={searchItem.length}
        value={value}
        onChange={setValue}
        data={searchItem}
        label="칵테일 검색"
        placeholder="칵테일이나 재료를 검색해보세요"
      />
      <Button>검색</Button>
    </div>
  );
}
