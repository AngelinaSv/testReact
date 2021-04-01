import React, { Component } from 'react';

export default class TableHeaders extends Component {
    render() {
        return (
            <tr>
                { this.props.headers.map((header) => <th className='table-header-cell '>{ header }</th>) }
            </tr>
        )
    }
}
