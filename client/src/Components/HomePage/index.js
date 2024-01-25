import './index.scss';
import React from 'react';
import witcherCover from '../../Assets/Images/Witcher3Cover.png';
import spidermanCover from '../../Assets/Images/SpidermanCover.png';
import falloutCover from '../../Assets/Images/FalloutCover.png';
import cyberpunkCover from '../../Assets/Images/CyberpunkCover.png';
import fableCover from '../../Assets/Images/Fable3Cover.png';
import borderlandsCover from '../../Assets/Images/Borderlands3Cover.png';
import acodysseyCover from '../../Assets/Images/ACOdysseyCover.png';
import eldenRingCover from '../../Assets/Images/EldenRingCover.png';
import gotCover from '../../Assets/Images/GOTCover.png';

const HomePage = () => {

    return (
        <>
        <div className='home-page'>
            <div className='header'>
                <h1>
                    <span>Here </span>
                    <span>to </span>
                    <span>help </span>
                    <span>you </span>
                    <span>find </span>
                    <span>your </span>
                    <span>next </span>
                    <span>game</span>       
                </h1>
            </div>

            <div className='favourite-games'>
                <span style={{'--i': 1}}><img src={witcherCover} alt="Witcher 3 cover"></img></span>
                <span style={{'--i': 2}}><img src={falloutCover} alt="Fallout New Vegas cover"></img></span>
                <span style={{'--i': 3}}><img src={spidermanCover} alt="Marvels Spiderman cover"></img></span>
                <span style={{'--i': 4}}><img src={cyberpunkCover} alt="Cyberpunk cover"></img></span>
                <span style={{'--i': 5}}><img src={borderlandsCover} alt="Borderlands 3 cover"></img></span>
                <span style={{'--i': 6}}><img src={fableCover} alt="Fable 3 cover"></img></span>
                <span style={{'--i': 7}}><img src={acodysseyCover} alt="Assasins Creed Odyssey cover"></img></span>
                <span style={{'--i': 8}}><img src={eldenRingCover} alt="Elden Ring cover"></img></span>
                <span style={{'--i': 9}}><img src={gotCover} alt="Ghost of Tsushima cover"></img></span>
            </div>
        </div>
        </>
    )

}

export default HomePage;