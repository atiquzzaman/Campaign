import React from 'react'
import Status from './Status'
import DatePicker from 'react-datepicker'
import ReactTable from 'react-table'

import 'react-table/react-table.css'
import "react-datepicker/dist/react-datepicker.css";
import { filterList } from '../utils';

export default class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStartDate: '',
            filterEndDate: ''
        }
    }

    setStartDate(date) {
        this.setState({
            filterStartDate: date
        })
    }
    setEndDate(date) {
        this.setState({
            filterEndDate: date
        })
    }
    setName(name) {
        this.setState({
            filterName: name
        })
    }

    render() {
        const filteredList = filterList(this.props.dataList,
            {
                filterName: this.state.filterName,
                filterStartDate: this.state.filterStartDate,
                filterEndDate: this.state.filterEndDate
            })

        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                headerClassName: 'table-header',
                className: 'table-row'
            },
            {
                Header: 'Start Date',
                accessor: 'startDate',
                headerClassName: 'table-header',
                className: 'table-row',
                sortable: false
            },
            {
                Header: 'End Date',
                accessor: 'endDate',
                headerClassName: 'table-header',
                className: 'table-row',
                sortable: false
            },
            {
                Header: 'Active',
                accessor: 'active',
                headerClassName: 'table-header',
                className: 'table-row',
                sortable: false,
                Cell: props => <Status active={props.value} />
            },
            {
                Header: 'Budget',
                accessor: 'budget',
                headerClassName: 'table-header',
                className: 'table-row',
                sortable: false
            }
        ]
        return (
            <>
                <div className="list-filter">
                    <DatePicker
                        id="StartDate"
                        className='datepicker'
                        selected={this.state.filterStartDate}
                        onChange={date => this.setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        selectsStart
                        startDate={this.state.filterStartDate}
                        endDate={this.state.filterEndDate}
                        placeholderText="Start Date" />
                    <DatePicker
                        id="EndDate"
                        className='datepicker'
                        selected={this.state.filterEndDate}
                        onChange={date => this.setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        selectsEnd
                        endDate={this.state.filterEndDate}
                        minDate={this.state.filterStartDate}
                        placeholderText="End Date" />
                    <div className="filter-name">
                        <input placeholder="Search by name"
                            onChange={(e) => this.setName(e.target.value)} />
                    </div>
                </div>
                <ReactTable
                    data={filteredList}
                    noDataText="No campaign found"
                    columns={columns}
                    multiSort={false}
                    resizable={false}
                    defaultSorted={[
                        {
                            id: "name",
                            desc: false
                        }
                    ]}
                    className="-striped -highlight"
                    pageSizeOptions={[10, 20, 30]}
                    defaultPageSize={10}
                />

            </>
        );
    }
}