import logo from '../assets/github-mark.png'

export default function Footer(){
    return (
        <footer className="footer">
            <a target='_blank' rel='noreferrer' href='https://github.com/calbush' className="links"><img className='github-logo' src={logo} alt='github logo'/></a>
            <div>
                <div className="react">
                    Built with <a target='_blank' rel='noreferrer' href='https://react.dev/'>React</a>
                </div>
                <div className="justwatch">Movie data provided by<a href='https://www.justwatch.com/' target='_blank' rel="noreferrer">JustWatch</a></div>
            </div>
        </footer>
    )
}