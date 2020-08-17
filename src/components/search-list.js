import React from 'react';
import { Card } from 'antd';
import SearchItem from './search-item';
import './search-list.css';

export default ({ data, filters }) => {
    return (<Card
                bordered={false}
                title={`Results (${data.length})`}
                className={`c-search-list c-search-list--table`}>
                    <ul className={'c-search-list__list'}>
                        { data.map(r => <li className={'c-search-list__item'} key={r.id}><SearchItem data={r} filters={filters} /></li>)}
                    </ul>
                </Card>);
}
