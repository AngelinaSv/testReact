import React, { Component } from 'react';

import TableHeaders from './TableHeaders';
import TableRow from './TableRow';

import { transformHeaders } from '../../lib/transformData';

export default class Table extends Component {
    render() {
        if(this.props.isLoading) {
            const rawHeaders = Object.keys(this.props.data[0]).map((header) => header);
            const headers = transformHeaders(rawHeaders);
            
            return(
                <div className='table'>
                    <table className='user-table'>
                        <tbody>
                            { <TableHeaders headers={ headers }/> }
                            {
                                this.props.data.map((row) => {
                                    return <TableRow row={ row }/>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        } else if(this.props.err) {
            return (
                <div className='error-msg-incorrect-format'>
                    <text className='error-msg-incorrect-format'>{this.props.err}</text>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}
