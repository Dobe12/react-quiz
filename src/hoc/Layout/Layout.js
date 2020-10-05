import React, { Component} from "react";
import classes from "./Layout.module.css"
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends Component {
    state = {
        isOpen: false
    }

    toggleMenuHandler = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    menuCloseHandler = () => {
        this.setState({
            isOpen: false
        })
    }
    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isOpen = {this.state.isOpen}
                    onClose = {this.menuCloseHandler}
                />
                <MenuToggle
                    onToggle = {this.toggleMenuHandler}
                    isOpen = {this.state.isOpen}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout
