import React, { PureComponent } from 'react';

class Table extends PureComponent {
    render() {
        let list = [];
        this.props.list.forEach(function (item, index) {
            list.push(<tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
            </tr>);
        });

        return <table>
            <tbody>{list}</tbody>
        </table>;
    }
}

export default Table;