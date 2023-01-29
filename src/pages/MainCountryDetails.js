import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import Loader from "../components/Loader";
import CountryDetails from "../components/CountryDetails";
import { useNavigate, useParams } from "react-router-dom";

const MainCountryDetails = () => {
  const { name } = useParams();
  const [lang, setLang] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [nativeName, setNativeName] = useState([]);
  const [countryDetails, setCountryDetails] = useState([]);

  const getCountries = () => {
    return axios.get(`https://restcountries.com/v3.1/name/${name}`);
  };
  const { status, isFetching } = useQuery("getCountries", getCountries, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setCountryDetails(data.data[0]);
      setLang(Object.values(data.data[0].languages));
      setCurrency(Object.values(data.data[0].currencies));
      setNativeName(Object.values(data.data[0].name.nativeName));
    },
  });

  return (
    <>
      {status === "loading" || isFetching ? (
        <Loader />
      ) : (
        <CountryDetails
          imgSrc={countryDetails?.flags.png}
          imgAlt={countryDetails?.name.common}
          countryName={countryDetails?.name.common}
          nativeName={nativeName}
          population={countryDetails?.population}
          region={countryDetails?.region}
          subregion={countryDetails?.subregion}
          capital={countryDetails?.capital}
          tld={countryDetails?.tld}
          currency={currency}
          lang={lang}
          borders={countryDetails?.borders}
        />
      )}
    </>
  );
};

export default MainCountryDetails;
