// import Header from './Header'
import Footer from './Footer'
import './index.css';
import './footer.css';
// import './header.css';


const Index = ({ children }) => {
    return (
        <>
            {/* <Header /> */}
                <main>
                    {children}
                </main>
            <Footer />
        </>
    );
};

export default Index;