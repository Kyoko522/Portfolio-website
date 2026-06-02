import Header from '../../components/header/header'
import Nav from '../../components/nav/Nav'
import About from '../../components/about/About'
import Scene from '../../components/scene/Scene'
import Experience from '../../components/experience/Experience'
import Portfolio from '../../components/portfolio/Portfolio'
import Contacts from '../../components/contacts/Contacts'
import Footer from '../../components/footer/Footer'


export default function Home() {
  return (
    <>
      <Header />
      <Nav />
      <About />
      {/* <Scene /> */}
      <Experience />
      <Portfolio />
      <Contacts />
      <Footer />
    </>
  );
}
