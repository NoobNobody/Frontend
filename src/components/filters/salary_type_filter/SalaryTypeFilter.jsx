import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const SalaryTypeFilter = ({ filterLabel, filterOptions, selectedFilters, onFilterChange }) => {
    return (
        <div className="generic-filters">
            <h5>{filterLabel}</h5>
            <ButtonGroup className="mb-2">
                {Object.entries(filterOptions).map(([key, value]) => (
                    <ToggleButton
                        key={key}
                        type="radio"
                        variant="outline-primary"
                        id={`generic-filter-${key}`}
                        name="salary"
                        value={key}
                        checked={selectedFilters === key}
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
