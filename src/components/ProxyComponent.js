/**
 *  Author: harry.lang
 *  Date: 2017/11/22
 *  Description: Created by harrylang on 2017/11/22.
 */
import React from 'react';

/**
 * 生命周期：
 *  Mounting/装载（当创建一个组件的实例并将其插入到DOM中时，将调用这些方法）：
 *      constructor()
 *      componentWillMount()
 *      render()
 *      componentDidMount()
 *  Updating/更新（由props或者state改变引起组件重新渲染时，调用这些方法）：
 *      componentWillReceiveProps()
 *      shouldComponentUpdate()
 *      componentWillUpdate()
 *      render()
 *      componentDidUpdate()
 *  Unmounting/卸载（从DOM中移除该组件时，调用这些方法）：
 *      componentWillUnmount()
 *  Error Handling/错误处理(在渲染期间，生命周期方法或任何子组件的构造函数中发生错误时,调用此方法):
 *      componentDidCatch()
 */
class Component extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps || this.state !== nextState) {
            return true;
        }
        return false;
    }
}

export default Component;