import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCities, loadCities} from "../../services/city";
import CitiesTable from "../../ui/components/city/CitiesTable";
import SearchText from "../../ui/components/common/SearchText";
import {getIsEditRole, loadIsEditRole} from "../../services/user";

const INITIAL_LOADING_ROW_SIZE = 100

function Cities() {
    const dispatch = useDispatch()
    const loadedCities = useSelector(getCities)
    const isEditRole = useSelector(getIsEditRole)
    const [searchValue, setSearchValue] = useState("")
    const [loadingAmountSize, setLoadingAmountSize] = useState(INITIAL_LOADING_ROW_SIZE)
    useEffect(() => {
        dispatch(loadIsEditRole())
    }, [dispatch])
    useEffect(() => {
        dispatch(loadCities(searchValue, 0, loadingAmountSize))
    }, [dispatch, searchValue, loadingAmountSize])
    if (!loadedCities.content) {
        return <div>Loading</div>
    }
    return (
        <div className="container-fluid container-md">
            <SearchText value={searchValue} setValue={setSearchValue}/>
            <CitiesTable
                isEditRole={isEditRole}
                citiesContent={loadedCities}
                loadMore={() => setLoadingAmountSize(loadingAmountSize + INITIAL_LOADING_ROW_SIZE)}
                loadAll={() => setLoadingAmountSize(loadedCities.totalElements)}
            />
        </div>
    );
}

export default Cities;
