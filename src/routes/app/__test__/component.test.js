import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { StaticRouter as Router } from 'react-router-dom';
import Loadable from 'react-loadable';

import App from '../components/App';
import Table from '../components/Table';

describe('app-组件测试', () => {

    describe('App组件', () => {
        const props = {
            app: {
                title: 'AppTest',
                list: [{ name: 'test', age: 18 }]
            },
            match: { url: '/app' },
            getList: () => { }
        };
        const appMatchWrapper = mount(
            <Router location={'/app/test'} context={{}}>
                <App {...props} />
            </Router>
        );
        const appNoMatchWrapper = mount(
            <Router location={'/app/11'} context={{}}>
                <App {...props} />
            </Router>
        );

        it('路由测试', () => {
            expect(appMatchWrapper.find('Route').length).toBe(1);
            expect(appNoMatchWrapper.find('Route').length).toBe(0);
        });

        it('日历组件测试', () => {
            expect(document.querySelector('.ant-calendar-picker-container')).toBeNull();
            appMatchWrapper.find('.ant-calendar-picker-input').at(0).simulate('click');
            expect(document.querySelector('.ant-calendar-picker-container')).not.toBeNull();
        });

    });

    it('Table组件-虚拟DOM测试', () => {
        const props = {
            list: [
                {
                    "name": "name1",
                    "age": 20
                },
                {
                    "name": "name2",
                    "age": 21
                }
            ]
        };
        const tableWrapper = shallow(<Table {...props} />);
        expect(tableWrapper.find('tr').length).toBe(2);
        expect(shallow(<Table list={[]} />).html()).toEqual('<table><tbody></tbody></table>');
    });

    it('Table组件-真实DOM测试', () => {
        const props = {
            list: [
                {
                    "name": "name1",
                    "age": 20
                },
                {
                    "name": "name2",
                    "age": 21
                }
            ]
        };
        const tableWrapper = mount(<Table {...props} />);
        expect(tableWrapper.find('tr').length).toBe(2);
        expect(mount(<Table list={[]} />).html()).toEqual('<table><tbody></tbody></table>');
    });

});