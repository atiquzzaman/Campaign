import React from 'react'
import Status from './Status'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class DataTable extends React.Component {
    render() {
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
                <ReactTable
                    data={this.props.dataList}
                    noDataText="No campaign is listed"
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