import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import './salary_type_filter.css';

const SalaryTypeFilter = ({ filterLabel, filterOptions, selectedFilters, onFilterChange }) => {
    return (
        <div className="generic-filters">
            <h5>{filterLabel}</h5>
            <ButtonGroup className="mb-2">
                {Object.entries(filterOptions).map(([key, value]) => (
                    <ToggleButton
                        key={key}
                        type="radio"
                        variant="custom-primary"
                        id={`generic-filter-${key}`}
                        name="salary"
                        value={key}
                        checked={selectedFilters === key}
                        className={`me-2 ${selectedFilters === key ? 'active' : ''}`}
                        onChange={(e) => onFilterChange(e.currentTarget.value)}
                    >
                        {value}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
    );
};

export default SalaryTypeFilter;
