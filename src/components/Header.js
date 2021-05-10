import React from 'react'
import Search from './Search' 
import { useMediaQuery } from 'react-responsive'

function Header() {
    const isSmallScreen = useMediaQuery({ query: '(min-width: 400px)' })

    return (
        <div className="head-container">
            <header>Welcome to the <span className="shopify">Shoppies! 🏆</span> 
            </header>
            <div className="subheading">The annual Shopify movie award show</div>
            <div className="desc">
                The most famous and prestigious award in the entertainment industry world.{isSmallScreen && <br/>} Nominate your <span className="bold">5 favourite movies</span> that deserve to win the Shoppies award
            </div> 
            <Search />
        </div>
    )
}

export default Header
