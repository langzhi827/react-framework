
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { DatePicker, Button, Dropdown, Menu, Icon } from 'antd';

import { updateTitle, getList } from '../redux/actions';

import '../assets/app.less';
import Title from './Title';
import Table from './Table';

@connect(({ app }) => {
    return {
        appTitle: app.title,
        appList: app.list
    };
}, (dispatch) => {
    return {
        dispatch: dispatch,
        updateTitle: (params) => dispatch(updateTitle(params)),
        getList: () => dispatch(getList())
    };
})
class App extends PureComponent {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        const { getList } = this.props;
        getList();
    }

    render() {
        const {
            appTitle, appList, children,
            updateTitle
        } = this.props;

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

        return <div styleName="app">
            {children}
            <Title>{appTitle}</Title>
            <DatePicker />
            <Button type="primary">Primary</Button>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                    Hover me <Icon type="down" />
                </a>
            </Dropdown>

            <div styleName="img" onClick={() => { updateTitle('app-' + (+new Date)); }}></div>
            <Table list={appList}></Table>
        </div>;
    }
}

export default App;