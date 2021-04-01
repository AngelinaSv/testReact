import React, { Component } from 'react';

import { selectDuplicate } from '../../lib/validate';
import { transformStates } from '../../lib/transformData';

export default class TableRow extends Component {
    render() {
        return (
            <tr>
                <td className='table-cell'>
                    { this.props.row.id }   
                </td>
                    {
                        Object.keys(this.props.row).map((header) => { 
                            let className = 'table-cell';
                            if(!this.props.row[header].isCorrect) {
                                className = 'table-cell-incorrect'
                            }
                            if(this.props.row[header] === this.props.row['id']) {
                                return null;
                            } 
                            if(this.props.row[header] === this.props.row['has children']) {
                                if(!this.props.row[header].value) {
                                    return <td className={className}>FALSE</td>
                                }
                            }
                            if(this.props.row[header] === this.props.row['license states']) {
                                return <td className={className}>{ transformStates(this.props.row[header].value) }</td>
                            }
                            return <td className={className}>{ this.props.row[header].value }</td>;
                        })
                    }
                <td className='table-cell'>
                    {
                        selectDuplicate(this.props.row['email'].duplicateWithEmail, this.props.row['phone'].duplicateWithPhone)
                    }
                </td>
            </tr>
        )
    }
}
