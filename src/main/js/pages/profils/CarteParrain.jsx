import './../../components/global.css'
import './profils.css'
// import photoIdentite from '../../../medias/images/identite-faciale_vert.png'
import photoIdentite from '../../../medias/images/identite.png'
import pouceBlanc from '../../../medias/images/pouce_blanc_rose2.png'
import pouceRose from '../../../medias/images/pouce_rose.png'

export const CarteParrain = ( {nom, entreprise, branches, domaines, zone, match} ) => {

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
                <span className='label'>Branches dans lesquelles il a un bon réseau :</span>
                <div className='texte'>
                    {branches}
                </div>
            </div>

            <div className='infos-profil'>
                <span className='label'>Domaines d'expertises :</span>
                <div className='texte'>
                    {domaines}
                </div>
            </div>
            
            <div className='infos-profil'>
                <span className='label'>Zone géographique :</span>
                <div className='texte'>
                    {zone}
                </div>
            </div>
        </section>
    )
};