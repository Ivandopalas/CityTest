import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import DataTable from "../common/DataTable";
import './CitiesTable.scss'
import {useDispatch} from "react-redux";
import {updateCity} from "../../../services/city";

function ImageCell(element, isEditRole) {
    const [elementUrl, setElementUrl] = useState(element.value);
    const dispatch = useDispatch()
    useEffect(() => {
        setElementUrl(element.value)
    }, [element.value])
    const updateCityFunc = (newValue) => {
        setElementUrl(newValue)
        dispatch(updateCity(element.cell.row.original.id, null, newValue))
    }
    return <div>
        {isEditRole && <input className="form-text form-control" value={elementUrl}
                              onChange={(el) => updateCityFunc(el.target.value)}/>}
        <img src={elementUrl} alt="City"/>
    </div>
}

function EditableTextCell(element, isEditRole) {
    const [elementName, setElementName] = useState(element.value);
    const dispatch = useDispatch()
    useEffect(() => {
        setElementName(element.value)
    }, [element.value])
    const updateCityFunc = (newValue) => {
        setElementName(newValue)
        dispatch(updateCity(element.cell.row.original.id, newValue, null))
    }
    return <div className="form-group cities-editable-input">
        {isEditRole ? <input className="form-text form-control" value={elementName}
                             onChange={(el) => updateCityFunc(el.target.value)}/>
            : <div>{elementName}</div>}
    </div>
}

const columns = (isEditRole) => [
    {
        Header: "Id",
        accessor: "id"
    },
    {
        Header: "Name",
        accessor: "name",
        Cell: (element) => EditableTextCell(element, isEditRole)
    },
    {
        Header: "Photo",
        accessor: "photoUrl",
        Cell: (element) => ImageCell(element, isEditRole)
    },
];

const initialState = {
    pageSize: 10,
    pageIndex: 0
};

const CitiesTable = ({citiesContent, loadMore, loadAll, isEditRole}) => {
    const totalExistingRows = citiesContent.totalElements
    const totalLoadedRows = citiesContent.numberOfElements
    return (
        <DataTable
            data={citiesContent.content}
            columns={columns(isEditRole)}
            initialState={initialState}
            loadMore={loadMore}
            loadAll={loadAll}
            totalLoadedRows={totalLoadedRows}
            totalExistingRows={totalExistingRows}
        />
    )
}

CitiesTable.propTypes = {
    text: PropTypes.string
}

export default CitiesTable