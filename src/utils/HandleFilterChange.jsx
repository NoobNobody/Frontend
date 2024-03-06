export function HandleFilterChange(setFilters, filterName, value) {
    setFilters(prevFilters => {
        const isValueSelected = prevFilters[filterName].includes(value);
        return {
            ...prevFilters,
            [filterName]: isValueSelected
                ? prevFilters[filterName].filter(item => item !== value)
                : [...prevFilters[filterName], value],
        };
    });
};
