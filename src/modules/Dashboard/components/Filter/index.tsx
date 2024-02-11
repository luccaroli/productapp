import React from 'react';
import {Container, FilterItem, FilterItemText} from './styles';
import {FilterTypes} from '../../types';

interface IFilterProps {
  selected: FilterTypes;
  setSelected: (value: FilterTypes) => void;
}

const filters = [
  {name: 'Todos', value: 'all'},
  {name: 'Nome', value: 'name'},
  {name: 'Preço', value: 'price'},
  {name: 'Quantidade', value: 'quantity'},
];

function Filter({selected, setSelected}: IFilterProps) {
  return (
    <Container>
      {filters.map(filter => (
        <FilterItem
          key={filter.value}
          onPress={() => {
            setSelected(filter.value as FilterTypes);
          }}
          selected={selected === filter.value}>
          <FilterItemText>{filter.name}</FilterItemText>
        </FilterItem>
      ))}
    </Container>
  );
}

export default Filter;
