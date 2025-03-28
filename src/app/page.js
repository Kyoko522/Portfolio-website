import Header from '../../components/header/header'
import Nav from '../../components/nav/Nav'
import About from '../../components/about/About'
import Experience from '../../components/experience/Experience'
import Portfolio from '../../components/portfolio/Portfolio'
import Contacts from '../../components/contacts/Contacts'


export default function Home() {
  return (
    <>
      <Header />
      <Nav />
      <About />
      <Experience />
      <Portfolio />
      <Contacts />
    </>
  );
}
