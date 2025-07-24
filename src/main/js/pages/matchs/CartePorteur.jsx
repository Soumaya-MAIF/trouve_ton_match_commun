import './../../components/global.css'
import './profils.css'
// import photoIdentite from '../../../medias/images/identite-faciale_vert.png'
import photoIdentite from '../../../medias/images/identite_vert.png'
import pouceBlanc from '../../../medias/images/pouce_blanc_rose2.png'
import pouceRose from '../../../medias/images/pouce_rose.png'

export const CartePorteur = ( {nom, entreprise, présentation} ) => {
    return (
        <section className='carte'>
            <div className='images'>
                <div><img src={photoIdentite} className="photo-identite" alt="photo-identite" /></div>
            </div>
            <div className='nom'>Nom :
                <div className='texte'>{nom}</div>
            </div>

            <div className='infos-profil'>
                <span className='label'>Entreprise :</span>
                <div className='texte'>
                    {entreprise}
                </div>
            </div>

            <div className='infos-profil'>
                <span className='label'>Présentation :</span>
                <div className='texte'>
                    {présentation}
                </div>
            </div>
        </section>
    )
};