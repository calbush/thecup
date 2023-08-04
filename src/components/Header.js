import logo from '../assets/solo_cup_logo.jpeg'

export default function Header(){
    return (
        <header className='header'>
            <div className='header-logo'>
                <img src={logo} alt='plastic red cup' className='main-logo'/>
                <h1>The Cup</h1>
            </div>
            <div>Placeholder for dropdown</div>
        </header>
    )
}