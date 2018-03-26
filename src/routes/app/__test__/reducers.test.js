import reducers from '../reducers';
import constants from '../constants';

const initialState = {
    title: 'App',
    list: []
};

describe('app reducers test', () => {

    it('应该返回initialState', () => {
        expect(reducers(undefined, {})).toEqual(initialState);
    });

    it('测试UPDATE_TITLE', () => {
        expect(reducers(undefined, {
            type: constants.UPDATE_TITLE,
            payload: 'app title'
        })).toEqual({
            title: 'app title',
            list: []
        });
    });

    it('测试UPDATE_LIST', () => {
        expect(reducers(undefined, {
            type: constants.UPDATE_LIST,
            payload: [{ name: 'test' }]
        })).toEqual({
            title: 'App',
            list: [{ name: 'test' }]
        });
    });

});