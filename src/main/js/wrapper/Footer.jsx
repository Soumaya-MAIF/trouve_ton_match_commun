import facebook from '../../medias/images/logos/facebook.png';
import instagram from '../../medias/images/logos/instagram.png';
import tiktok from '../../medias/images/logos/tic-tac.png';
import linkedin from '../../medias/images/logos/linkedin.png';
import './footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer-container">
                <div className="footer-row">
                    <div className="footer-col">
                        <div className="social-icons">
                            <div><img src={instagram} className="img-footer" alt="instagram" /></div>
                            <div><img src={facebook} className="img-footer" alt="facebook" /></div>
                            <div><img src={tiktok} className="img-footer" alt="tiktok" /></div>
                            <div><img src={linkedin} className="img-footer" alt="linkedin" /></div>
                        </div>
                    </div>
                    <div className="footer-col">
                        <div className='Initiative79'><b>INITIATIVE DEUX SEVRES</b></div>
                        <div>Pépinière d'Entreprises du Niortais</div>
                        <div>4, BD Louis Tardy</div>
                        <div>79000 Niort</div>
                    </div>
                    <div className="footer-col">
                        <div>Téléphone : +33 6 79 87 56 09</div>
                        <div>accompagnement@initiativedeuxsevres.fr</div>
                    </div>
                    <div className="footer-col">
                        <div className='horaires'>
                            <div>Du lundi au vendredi</div>
                            <div>de 08h30 à 12h30</div>
                            <div>et de 13h30 à 17h30</div>
                        </div>
                    </div>
                </div>
                <div className="mentionsLégales">
                    <div>© 2025 Initiative France - Intranet</div>  
                </div>
            </div>
        </footer>
    );
};

export default Footer;