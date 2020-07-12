import React from 'react';
import './Toolbar.css';

import Logo from 'components/Logo/Logo';
import NavigationItems from 'components/Navigation/NavigationItems';
import DrawerToggle from 'components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';

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



