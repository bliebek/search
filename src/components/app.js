import React, { useState } from 'react';
import SearchForm from './search-form';
import SearchList from './search-list';
import filteredApiData from './../api/api';

export default () => {
  const [ data, setData ] = useState([]);
  const [ filters, setFilters ] = useState([]);

  const onFormChange = async fields => {
    setFilters(fields);
    setData(await filteredApiData(fields));
  };

  return (<div className="c-app">
    <SearchForm onChange={onFormChange} />
    <SearchList data={data} filters={filters} />
  </div>);
}
