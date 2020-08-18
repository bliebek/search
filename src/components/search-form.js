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
  'input': () => <span>Type eg.: <strong>email:.org</strong></span>,
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

const canDisplayPopover = type => {
    const displayedInfo = localStorage.getItem('displayedInfo');

    if (!displayedInfo) {
      return true;
    }

    if (displayedInfo === type) {
      return false;
    }

    if (type === 'tag') {
      return true;
    }
};

const savePopover = type => {
    const displayedInfo = localStorage.getItem('displayedInfo');

    if (type === 'info' && !displayedInfo) {
      localStorage.setItem('displayedInfo', type);
    }

    if (type === 'tag' && displayedInfo !== 'tag') {
      localStorage.setItem('displayedInfo', type);
    }
}

export default ({ onChange }) => {

  const [ form ] = Form.useForm();
  const [ searchFields, setSearchFields ] = useState([]);
  const [ popoverVisible, setPopoverVisible ] = useState(canDisplayPopover('info') ? <infos.input /> : false);
  const inputRef = useRef();

  const hidePopover = type => {
    setPopoverVisible(false);
    savePopover(type);
  };

  const onFieldsChange = state => {
    setSearchFields(state);
    onChange(state);
  }

  const onInputChange = () => {
      hidePopover('info');
  }

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
    onFieldsChange(searchFields.filter(r => r.field !== field.field).concat([field]));
  };

  const removeField = field => {
    setPopoverVisible(canDisplayPopover('tag') ? <infos.tag fieldName={field} /> : false);
    savePopover('tag');
    onFieldsChange(searchFields.filter(r => r.field !== field));
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
          {searchFields.map((field, i) => <Tag
                                            color={'blue'}
                                            key={`${field.field}-${i}`}
                                            closable
                                            onClose={() => removeField(field.field)}>
                                              {field.field} : {field.value}
                                          </Tag>)}
      </div></div>);
}
