import React, {Suspense} from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import './styles/index.scss'
import {MainPage} from "pages/MainPage";
import {AboutPage} from "pages/AboutPage";
import {classNames} from "shared/lib/classNames/classNames";
import {useTheme} from 'app/providers/ThemeProvider';

const App = () => {
    const {theme, toggleTheme} = useTheme()
    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>-- Toggle Theme --</button>
            <Link to='/'>Main Page</Link> | <Link to='/about'>About Page</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='about' element={<AboutPage/>}/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
