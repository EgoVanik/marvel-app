import { useState, useEffect } from "react";
import {Helmet} from 'react-helmet';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from '../charSearchForm/charSearchForm';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);
    const [offset, setOffset] = useState(0);

    const onCharSelected = (id) => {
        setChar(id);
    }

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        // console.log(offset);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
        // eslint-disable-next-line
    },[offset])

    let stickyF = 'c-sticky';
    if(offset >= 450){
        stickyF = 'c-fix'
    }
    
    return (
        <>
            <Helmet>
            <meta
                name="description"
                content="Marvel information portal"
            />
            <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <div className={stickyF} >
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm/>
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;