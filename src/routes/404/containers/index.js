/**
 *  Author: harry.lang
 *  Date: 2017/11/24
 *  Description: Created by harrylang on 2017/11/24.
 */
import React from 'react';
import {connect} from 'react-redux';
import { DatePicker,Dropdown,Menu,Icon } from 'antd';

import {updateTitle} from '../actions';
import img from '../assets/images/hehe.png';

class Component extends React.Component {

    changeTitle() {
        this.props.updateTitle('404-' + (+new Date));
    }

    render() {
        const {nomatch} = this.props;

        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
                </Menu.Item>
            </Menu>
        );

        return <div className="no-match">
            <h2>{nomatch.title}</h2>

            <DatePicker/>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                    Hover me <Icon type="down"/>
                </a>
            </Dropdown>

            <img className="img" src={img} alt="404" onClick={this.changeTitle.bind(this)}/>

            <h3>No match for <code>{this.props.location.pathname}</code></h3>
        </div>;
    }
}


function mapStateToProps(state, ownProps) {
    return state.noMatchReducer ? {nomatch: state.noMatchReducer} : {};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatch: dispatch,
        updateTitle: (params)=>dispatch(updateTitle(params))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Component);
