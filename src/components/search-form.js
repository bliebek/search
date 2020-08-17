import React, { useRef, useState } from 'react';
import { AutoComplete, Form, Popover, Tag } from 'antd';
import './search-form.css';

const { Item: FormItem } = Form;

const allowedFields = [
  'id',
  'first_name',
  'last_name',
  'email',
  'ip_address',
  'app_id',
  'domain',
  'mac',
  'user_agent',
  'device_id'
];

const infos = {
'input': () =>
<span>Type eg.: <strong>email:.org</strong></span>,
    'tag': ({fieldName}) => (<span>
                      Type <strong>-{fieldName}</strong> to remove field from search.
                        You don't need to remove field change it's value. Simply type <strong>{fieldName}: newValue</strong> to override it.
                    </span>)
};

const parseSearch = search => {
  const [ field, value ] = search.split(':');

  if (field && value && allowedFields.indexOf(field) > -1) {
    return ({ field: field.trim(), value: value.trim() });
  }

  return null;
};

export default ({ onChange }) => {
  const [ form ] = Form.useForm();
  const [ searchFields, setSearchFields ] = useState([]);
  const [ popoverVisible, setPopoverVisible ] = useState(<infos.input />);
  const inputRef = useRef();

  const onInputChange = () => setPopoverVisible(false);

  const onFormSubmit = ({ search }) => {
    const field = parseSearch(search);
    if (field && field.field && field.value) {
        addField(parseSearch(search));
    }
    if(search.indexOf('-') === 0) {
      removeField(search.substr(1));
    }
    form.resetFields();
    inputRef.current.focus();
  };

  const addField = field => {
    const newState = searchFields.filter(r => r.field !== field.field).concat([field]);
    setSearchFields(newState);
    onChange(newState);
  };

  const removeField = field => {
    const newState = searchFields.filter(r => r.field !== field);
    setPopoverVisible(<infos.tag fieldName={field} />);
    setSearchFields(newState);
    onChange(newState);
  };

  return (<div className={'c-search-form'}>
    <Form
      onFinish={onFormSubmit}
      form={form}>
        <Popover
            content={popoverVisible}
            visible={!!popoverVisible}
            placement={'topLeft'}
        >
            <FormItem name={'search'}>
              <AutoComplete
                  autoFocus
                  ref={inputRef}
                  options={allowedFields.map(value => ({ value }))}
                  onChange={onInputChange}
                  filterOption={(input, option) => option.value.toLowerCase().indexOf((input || '').toLowerCase()) > -1}
                  size={'large'}
              />
          </FormItem>
        </Popover>
    </Form>
      <div className={'c-search-form__fields'}>
          {searchFields.map((field, i) => <Tag color={'blue'} key={`${field.field}-${i}`} closable onClose={() => removeField(field.field)}>{field.field} : {field.value}</Tag>)}
      </div></div>);
}
