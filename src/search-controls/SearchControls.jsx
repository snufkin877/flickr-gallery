import React, { useState, useEffect, useRef } from 'react';
import ImagesGallery from '../images-gallery/ImagesGallery.jsx';
import './search-controls.css';
import './dropdown-styles.css';
import Dropdown from 'react-dropdown';

const SearchControls = () => {

    const [data, setData] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [savedSearchedItems, setSavedSearchedItems] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    let timeout = null;
    const searchInputRef = useRef('');

    useEffect(() => {
        setSavedSearchedItems(getSavedSearchedFromLocalStorage());
    }, []);

    useEffect(() => {
        if (selectedOption) {
            searchInputRef.current.value = selectedOption;
        }
    }, [selectedOption]);

    const getSavedSearchedFromLocalStorage = () => {
        return localStorage.getItem('searchTerms') ? JSON.parse(localStorage.getItem('searchTerms')) : [];
    }

    const fetchData = async (searchTerm) => {
        const apiKey = '15b67c2a8b4288ff1fddf5eb56655cfb';
        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=${apiKey}&content_type=1&is_getty=1&text=${searchTerm}`;
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
    }

    const handleInputChange = (searchTerm) => {

        if (!searchTerm) return;

        clearTimeout(timeout);

        timeout = setTimeout(function () {
            setSearchTerm(searchTerm);
            setSelectedOption('');
            fetchData(searchTerm.split(' ').join('-'));
        }, 500);
    }

    const saveSearch = () => {
        if (searchTerm) {
            const storedSearchTerms = getSavedSearchedFromLocalStorage();

            if (storedSearchTerms.indexOf(searchTerm) === -1) {
                storedSearchTerms.push(searchTerm);
                localStorage.setItem('searchTerms', JSON.stringify(storedSearchTerms));
                setSavedSearchedItems(savedSearchedItems => savedSearchedItems.concat([searchTerm]));
            }
        }
    }

    const handleSelectValue = (selectedValue) => {
        setSelectedOption(selectedValue);
        fetchData(selectedValue.split(' ').join('-'));
    }

    return (
        <div className="search-container">
            <input className="search-input" 
                type="text"
                name="search"
                ref={searchInputRef}
                onChange={e => handleInputChange(e.target.value)}
            />

            <div className="save-controls">
                <button className="save-search" onClick={saveSearch}>SAVE SEARCH</button>

                {(savedSearchedItems.length > 0 &&
                    <Dropdown options={savedSearchedItems}
                              value={selectedOption}
                              placeholder="Saved Searches"
                              onChange={selectedValue => handleSelectValue(selectedValue.value)} 
                    />
                )}
            </div>

            <ImagesGallery data={data} />

        </div>
    );
};

export default SearchControls;