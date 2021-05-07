import React from 'react'
import Search from './Search' 

function Header() {
    return (
        <div className="head-container">
            <header>Welcome to the <span className="shopify">Shoppies! 🏆</span> 
            </header>
            <div className="subheading">The annual Shopify movie award show</div>
            <div className="desc">
                The most famous and prestigious award in the entertainment industry world
                <br/>
                Nominate your <span className="bold">5 favourite movies</span> that deserve to win the Shoppies award
            </div> 
            <Search />
        </div>
    )
}

export default Header
