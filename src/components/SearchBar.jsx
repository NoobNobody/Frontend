import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

// import SearchIcon from '@mui/icons-material/Search';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

const SearchBar = () => {

    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const jobList = [
        { label: 'Informatyk' },
        { label: 'Kucharz' },
        { label: 'Dozorca' },
        { label: 'Policjant' },
        { label: 'Mechanik' },
        { label: "Budowlaniec" },
        { label: 'Nauczyciel' },
    ];

    const citySearch = [
        { label: 'Warszawa' },
        { label: 'Kraków' },
        { label: 'Rzeszów' },
        { label: 'Wrocław' },
        { label: 'Nowy Sącz' },
        { label: "Gdańsk" },
        { label: 'Katowice' },
    ];

    const handleClick = () => {
        alert(`Wybrane stanowisko: ${selectedJob?.label}, Wybrane miasto: ${selectedCity?.label}`);
    };


    return (
        <div className="d-flex w-100 mb-3">
            {/* <Autocomplete
                freeSolo
                id="jobList"
                value={selectedJob}
                onChange={(event, newValue) => setSelectedJob(newValue)}
                disableClearable
                options={jobList}
                sx={{ width: '100%' }}
                renderInput={(params) => (

                    <TextField
                        {...params}
                        label="Jakiej pracy szukasz?"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            startAdornment: (
                                <>
                                    <SearchIcon fontSize="small" />
                                </>
                            ),
                        }}
                    />
                )}
            />
            <Autocomplete
                freeSolo
                id="citySearch"
                value={selectedCity}
                onChange={(event, newValue) => setSelectedCity(newValue)}
                disableClearable
                options={citySearch}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Miasto"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            startAdornment: (
                                <>
                                    <LocationOnIcon fontSize="small" />
                                </>
                            ),
                        }}
                    />
                )}
            /> */}
            <Button onClick={handleClick} variant="primary">
                Szukaj
            </Button>
        </div>
    )
}

export default SearchBar;