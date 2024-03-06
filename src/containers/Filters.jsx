// Filters.jsx
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { dateFilters, jobModelFilters, jobTypeFilters, jobTimeFilters, salaryTypes, salaryRange, filterCategories, filtersCombined } from '../utils/Filters';
import ObjectFilter from '../components/filters/ObjectFilter';
import ElementFilter from '../components/filters/ElementFilter';
import SalaryTypeFilter from '../components/filters/salary_type_filter/SalaryTypeFilter';

const Filters = ({
    filters,
    setFilters,
    selectedSalaryType,
    setSelectedSalaryType,
    selectedSalaryRange,
    setSelectedSalaryRange,
    submitFilters,
    clearAllFilters,
    filtersApplied
}) => {

    const areFiltersActive = () => {
        return Object.values(filters).some(value => {
            if (Array.isArray(value)) {
                return value.length > 0;
            } else {
                return value && value !== 'any';
            }
        });
    };

    // const clearAllFiltersAndFetchAll = async () => {
    //     setFilters({
    //         selectedDate: null,
    //         selectedJobTime: [],
    //         selectedJobModel: [],
    //         selectedJobType: [],
    //         selectedSalaryType: 'any',
    //         selectedSalaryRange: 'any',
    //     });

    //     // Jeśli masz dostępną funkcję do pobierania wszystkich ofert bez filtrów, wywołaj ją
    //     await fetchAllJobOffers(); // Zakładając, że istnieje taka funkcja

    //     // Możesz również wywołać submitFilters z pustymi filtrami, jeśli to resetuje wyniki
    //     await submitFilters({
    //         selectedDate: null,
    //         selectedJobTime: [],
    //         selectedJobModel: [],
    //         selectedJobType: [],
    //         selectedSalaryType: 'any',
    //         selectedSalaryRange: 'any',
    //     });
    // };

    const handleDateChange = (newFilter) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            selectedDate: newFilter
        }));
    };


    const handleJobTypeChange = (selectedType) => {
        setFilters(prevFilters => {
            const isSelected = prevFilters.selectedJobType.includes(selectedType);
            return {
                ...prevFilters,
                selectedJobType: isSelected
                    ? prevFilters.selectedJobType.filter(type => type !== selectedType)
                    : [...prevFilters.selectedJobType, selectedType],
            };

        });
        console.log(selectedType);
    };

    const handleJobModelChange = (selectedModel) => {
        setFilters(prevFilters => {
            const isSelected = prevFilters.selectedJobModel.includes(selectedModel);
            return {
                ...prevFilters,
                selectedJobModel: isSelected
                    ? prevFilters.selectedJobModel.filter(type => type !== selectedModel)
                    : [...prevFilters.selectedJobModel, selectedModel],
            };
        });
        console.log(selectedModel);
    };

    const handleJobTimeChange = (selectedTime) => {
        setFilters(prevFilters => {
            const isSelected = prevFilters.selectedJobTime.includes(selectedTime);
            return {
                ...prevFilters,
                selectedJobTime: isSelected
                    ? prevFilters.selectedJobTime.filter(type => type !== selectedTime)
                    : [...prevFilters.selectedJobTime, selectedTime],
            };
        });
        console.log(selectedTime);
    };

    const handleSalaryTypeChange = (type) => {
        setSelectedSalaryType(type);
        setSelectedSalaryRange('any');
        setFilters(prevFilters => ({
            ...prevFilters,
            selectedSalaryType: type,
            selectedSalaryRange: 'any'
        }));
    };

    const handleSalaryRangeChange = (range) => {
        let sanitizedRange;
        if (range.includes('Mniejsze niż')) {
            sanitizedRange = '<' + range.replace('Mniejsze niż', '').replace('zł', '').trim();
        } else if (range.includes('Większe niż')) {
            sanitizedRange = '>' + range.replace('Większe niż', '').replace('zł', '').trim();
        } else {
            sanitizedRange = range.replace('zł', '').trim();
        }
        setSelectedSalaryRange(sanitizedRange);
        setFilters(prevFilters => ({
            ...prevFilters,
            selectedSalaryRange: sanitizedRange
        }));
    };

    const handleSalaryChange = (type = 'any', range = 'any') => {
        let sanitizedRange = range;
        if (range.includes('Mniejsze niż')) {
            sanitizedRange = '<' + range.replace('Mniejsze niż', '').replace('zł', '').trim();
        } else if (range.includes('Większe niż')) {
            sanitizedRange = '>' + range.replace('Większe niż', '').replace('zł', '').trim();
        } else if (range !== 'any') {
            sanitizedRange = range.replace('zł', '').trim();
        }

        setSelectedSalaryType(type);
        setSelectedSalaryRange(sanitizedRange);
        setFilters(prevFilters => ({
            ...prevFilters,
            selectedSalaryType: type,
            selectedSalaryRange: sanitizedRange
        }));
    };


    const removeFilter = (filterType, valueToRemove = null) => {
        setFilters(prevFilters => {
            if (valueToRemove !== null && Array.isArray(prevFilters[filterType])) {
                return {
                    ...prevFilters,
                    [filterType]: prevFilters[filterType].filter(value => value !== valueToRemove),
                };
            } else {
                const newValue = Array.isArray(prevFilters[filterType]) ? [] : null;
                return {
                    ...prevFilters,
                    [filterType]: newValue,
                };
            }
        });
    };

    const findSalaryLabel = (salaryType, salaryValue) => {
        const rangeKey = salaryType + '_range';
        const ranges = salaryRange[rangeKey];
        if (!ranges) return salaryValue;
        if (salaryValue.startsWith('<')) {
            return ranges[0];
        } else if (salaryValue.startsWith('>')) {
            return ranges[ranges.length - 1];
        }
        return ranges.find(range => range.includes(salaryValue)) || salaryValue;
    };


    return (
        <>
            <div className="active-filters" style={{ display: filtersApplied ? 'block' : 'none' }}>
                <h5>Aktywne filtry</h5>
                {Object.entries(filters).map(([key, values]) => (
                    Array.isArray(values) && values.length > 0 ?
                        values.map(value => (
                            <div key={`${key}-${value}`} className="active-filter-badge">
                                <strong>{filterCategories[key]}:</strong> {filtersCombined[value] || value}
                                <button onClick={() => removeFilter(key, value)}>×</button>
                            </div>
                        )) : null
                ))}

                {filters.selectedDate && filters.selectedDate !== dateFilters.all && (
                    <div className="active-filter-badge">
                        <strong>{filterCategories.selectedDateFilter}:</strong> {filtersCombined[filters.selectedDate]}
                        <button onClick={() => removeFilter('selectedDate', filters.selectedDate)}>×</button>
                    </div>
                )}

                {selectedSalaryType && selectedSalaryType !== "any" && selectedSalaryRange && selectedSalaryRange !== "any" && (
                    <div className="active-filter-badge">
                        <strong>Zarobki w zakresie:</strong> {salaryTypes[selectedSalaryType]} {findSalaryLabel(selectedSalaryType, selectedSalaryRange)}
                        <button onClick={() => handleSalaryChange()}>×</button>
                    </div>
                )}

                {areFiltersActive() && (
                    <Button onClick={clearAllFilters} variant="secondary">Wyczyść filtry</Button>
                )}
            </div>
            <ElementFilter
                filterLabel="Data dodania"
                filterOptions={dateFilters}
                selectedFilters={filters.selectedDate}
                onFilterChange={handleDateChange}
            />
            <SalaryTypeFilter
                filterLabel="Zarobki"
                filterOptions={salaryTypes}
                selectedFilters={filters.selectedSalaryType}
                onFilterChange={handleSalaryTypeChange}
            />
            {selectedSalaryType && salaryRange[selectedSalaryType + '_range'] && (
                <div className="salary-range-filters">
                    {salaryRange[selectedSalaryType + '_range'].map(range => (
                        <Form.Check
                            key={range}
                            type="radio"
                            id={`salary-range-filter-${range}`}
                            name="salary-range-filter"
                            label={range}
                            checked={selectedSalaryRange === range}
                            onChange={() => handleSalaryRangeChange(range)}
                        />
                    ))}
                </div>
            )}
            <ObjectFilter
                filterLabel="Model pracy"
                filterOptions={jobModelFilters}
                selectedFilters={filters.selectedJobModel}
                onFilterChange={handleJobModelChange}
            />
            <ObjectFilter
                filterLabel="Typ pracy"
                filterOptions={jobTypeFilters}
                selectedFilters={filters.selectedJobType}
                onFilterChange={handleJobTypeChange}
            />
            <ObjectFilter
                filterLabel="Czas pracy"
                filterOptions={jobTimeFilters}
                selectedFilters={filters.selectedJobTime}
                onFilterChange={handleJobTimeChange}
            />
            <Button onClick={submitFilters} variant="primary">Szukaj oferty</Button>
        </>
    );
};

export default Filters;
