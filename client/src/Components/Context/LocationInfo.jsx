import React, { createContext , useEffect, useState } from 'react';
import { useGeolocation } from "@uidotdev/usehooks";

export const LocationInfoContext = createContext();

const LocationInfo = ({children}) => {
    const state = useGeolocation();
    const [countryCode,setCountryCode] = useState('');
    const [countryName,setCountryName] = useState('');
    const [address,setAddress] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [currencyCode,setCurrencyCode]= useState('')
    const [currencyName,setCurrencyName]= useState('')
    const [currencySymbol,setCurrencySymbol]= useState('')
    const [flagUrl,setFlagUrl] = useState('');

    useEffect(() => {
        if (state.error) {
            console.error('Enable permissions to access your location data');
            return;
        }

        if (!state.loading) {
            fetch(`https://api.maptiler.com/geocoding/${state.longitude},${state.latitude}.json?key=zE1FzcwJNAEMBp0gU7x9`)
                .then((response) => response.json())
                .then((data) => {
                    // Extracting the user details
                    setCountryCode(data.features[0].properties.country_code);
                    setCountryName(data.features[4].place_name)
                    setAddress(data.features[0].place_name.trim())
                    setPostalCode(data.features.find((feature) => feature.properties.place_type_name.includes('postal code')).text)
                })
                .catch((error) => console.error('Error:', error));
        }
    }, [state.latitude, state.longitude, state.loading, state.error]);

    if(countryName){
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then((response) => response.json())
            .then((data) => {
                // Extract currency information
                setCurrencyCode(Object.keys(data[0].currencies)[0]); // Assuming there's only one currency
               
                setCurrencyName(data[0].currencies[currencyCode].name);
                setCurrencySymbol(data[0].currencies[currencyCode].symbol);
                // Get the flag URL
                setFlagUrl(data[0].flags.svg); // You can use 'png' instead of 'svg' for PNG format
            })
            .catch((error) => console.error('Error:', error));
    }

    if (state.loading) {
        return <p>Loading... (you may need to enable permissions)</p>;
    }
  return (
    <>
    
    <LocationInfoContext.Provider value={{countryCode,countryName,address,postalCode,currencyCode,currencyName,currencySymbol,flagUrl}}>
        {children}
    </LocationInfoContext.Provider></>
  )
}

export default LocationInfo;
