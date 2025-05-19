import Card from "../components/Card";
import CardProfile from "../components/CardProfile";
import Navs from "../components/Navs";
import Empon from "..//assets/empon.png";
import Rempah from "..//assets/rempah.png";
import Dela from "..//assets/dela.jpg";
import Nisa from "..//assets/nisa.jpg";
import Diva from "..//assets/diva.jpg";
import Jijah from "..//assets/jijah.jpg";
import DaunBawah from '../assets/Group43.png'
import DaunAtas from '../assets/Group44.png'






function About() {
  return (
    <>
    <div className="max-w-[100rem] mx-auto">
        <Navs/>
    </div>
    <div className="bg-gradient-to-t from-greenDark to-whitemilk max-w-[100rem] h-screen pb-20 mx-auto relative ">
    
    <div className="mt-20 text-center">
        <h1 className="text-greenDark text-5xl font-bold ">About Us</h1>
    </div>
      <div className=" mx-auto mt-10 justify-items-center relative">
        <div className="columns-3 gap-10 mt-5  ">
          <CardProfile judul={"Najla Nadiva"} src={Diva} deskripsi={"2211521006"} buttons={"text"}/>
          <CardProfile judul={"Annisa Nurul Hakim "} src={Nisa} deskripsi={"2211521007"} buttons={"text"} />
          <CardProfile judul={"Frizqya Dela Pratiwi"} src={Dela} deskripsi={"2211522003"} buttons={"text"}/>
        </div>
        <div className="columns-3 gap-10 p-10">
          <CardProfile judul={"Azizah Novi Delfianti"} src={Jijah} deskripsi={"2211522022"} buttons={"text"} />
          <CardProfile judul={"Athaya Clara Diva"} src={Empon} deskripsi={"2211523009"} buttons={"text"}  />
          <CardProfile judul={"Faiz Hadyan"} src={Empon} deskripsi={"2211523023"} buttons={"text"} />
        </div>
      </div>

       <div className="relative flex justify-center items-end mt-16">
        <img src={DaunAtas} alt="Daun" className="absolute top-[-300px] right-[0%] w-[450px]" />
        <img src={DaunAtas} alt="Daun" className="absolute top-[-300px] right-[0%] w-[450px]" />
        <img src={DaunBawah} alt="Daun" className="absolute bottom-[-80px] left-[0%] w-[450px]" />
        <img src={DaunBawah} alt="Daun" className="absolute bottom-[-80px] left-[0%] w-[450px]" />

     </div>



    </div>
    
    </>
  );
}

export default About;
