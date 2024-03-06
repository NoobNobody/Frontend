import React from 'react';
import { Form } from 'react-bootstrap';

const ElementFilter = ({ filterLabel, filterOptions, selectedFilters, onFilterChange }) => {
    return (
        <div className="generic-filters">
            <h5>{filterLabel}</h5>
            {Object.entries(filterOptions).map(([key, value]) => (
                <div key={key} className="mb-2">
                    <Form.Check
                        type="radio"
                        id={`generic-filter-${key}`}
                        name={`generic-filter-${key}`}
                        label={value}
                        checked={selectedFilters === key}
                        onChange={() => onFilterChange(key)}
                    />
                </div>
            ))}
        </div>
    );
};

export default ElementFilter;

