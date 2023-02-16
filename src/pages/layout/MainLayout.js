import React from 'react';
import Footer from '../../component/Footer/Footer';
import Header from '../../component/Header/Header';

const MainLayout = ({children}) => {
    return (
        <>
        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
        </>
    );
}

export default MainLayout;
