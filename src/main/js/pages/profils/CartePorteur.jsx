import './../../components/global.css'
import './profils.css'
// import photoIdentite from '../../../medias/images/identite-faciale_vert.png'
import photoIdentite from '../../../medias/images/identite_vert.png'
import pouceBlanc from '../../../medias/images/pouce_blanc_rose2.png'
import pouceRose from '../../../medias/images/pouce_rose.png'

export const CartePorteur = ( {nom, entreprise, description, besoins, lieu, match} ) => {
    return (
        <section className='carte'>
            <div className='images'>
                <div><img src={photoIdentite} className="photo-identite" alt="photo-identite" /></div>
                <div>
                    {match && <img src={pouceRose} className="pouce-image" alt="Pouce rose"/>}
                    {!match && <img src={pouceBlanc} className="pouce-image" alt="Pouce blanc"/>}
                </div>
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
                <span className='label'>Description rapide de l'activité :</span>
                <div className='texte'>
                    {description}
                </div>
            </div>

            <div className='infos-profil'>
                <span className='label'>Besoins potentiels :</span>
                <div className='texte'>
                    {besoins}
                </div>
            </div>
            
            <div className='infos-profil'>
                <span className='label'>Lieu d'activité :</span>
                <div className='texte'>
                    {lieu}
                </div>
            </div>
        </section>
    )
};