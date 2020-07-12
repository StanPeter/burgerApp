import React from 'react';
import Logo from '../../Logo/Logo';
import './Toolbar.css';
import NavigationItems from '../NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
    <header className='Toolbar'>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className='Logo'>
            <Logo />
        </div>
        <nav className='DesktopOnly'>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;



