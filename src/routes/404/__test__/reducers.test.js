import reducers from '../reducers';
import constants from '../constants';

const initialState = {
    title: '404',
    list: []
};

describe('404 reducers test', () => {

    it('应该返回initialState', () => {
        expect(reducers(undefined, {})).toEqual(initialState);
    });

    it('测试UPDATE_TITLE', () => {
        expect(reducers(undefined, {
            type: constants.UPDATE_TITLE,
            payload: '404 title'
        })).toEqual({
            title: '404 title',
            list: []
        });
    });

    it('测试UPDATE_LIST', () => {
        expect(reducers(undefined, {
            type: constants.UPDATE_LIST,
            payload: [{ name: 'test' }]
        })).toEqual({
            title: '404',
            list: [{ name: 'test' }]
        });
    });

});