
import Banner from './Banner';
import Topcompany from './Topcompany';
import Blog from './Blog';
import Courses from './Courses';
import Aboutus from './Aboutus';
import Handsonexp from './Handsonexp';
import Services from './Services';



function Home() {
    return (
      <div className="App">
        <Banner/>
        <Aboutus/>
        <Courses/>
        <Services/>
        <Handsonexp/>
        <Blog/>
        <Topcompany/>
      </div>
    );
  }
  
  export default Home;