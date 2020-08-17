import React, { memo } from 'react';
import './search-item.css';

const Field = ({ label, value, highlight }) => (<div className={`c-search-item__field ${highlight ? 'c-search-item__field--highlight' : ''}`}>
    <span className={'c-search-item__field--label'}>{ label }</span>
    <span className={'c-search-item__field--value'} dangerouslySetInnerHTML={{ __html: value}} />
</div>);

const escape  = str => str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
const highlight = (replace, str) => (str || '').replace(new RegExp(escape(replace), 'gi'), match => `<span class="highlight">${match}</span>`);

export default memo(({ data, filters }) => {
    const model = [
        [ 'ID', 'id' ],
        [ 'First name', 'first_name' ],
        [ 'Last name', 'last_name' ],
        [ 'Email', 'email' ],
        [ 'Domain', 'domain' ],
        [ 'IP', 'ip_address' ],
        [ 'App ID', 'app_id' ],
        [ 'Mac address', 'mac' ],
        [ 'User agent', 'user_agent' ],
        [ 'Device ID', 'device_id' ]
    ];

    return (<div className={'c-search-item'}>
        { model.map(([ label, valueRef ]) => {
            const filter = filters.find(r => r.field === valueRef) || {};

            return (<Field
                        key={label}
                        label={label}
                        value={filter.value ? highlight(filter.value, data[valueRef]) : data[valueRef]}
                        highlight={!!filter.field}
                    />);
        })}
    </div>);
});
