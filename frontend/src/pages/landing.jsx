import React, { useState } from 'react';
import Empon from '../assets/empon.png'
import DaunBawah from '../assets/Group43.png'
import DaunAtas from '../assets/Group44.png'
import Button from '../components/Button'
import Navs from '../components/Navs'
import Card from '../components/Card';
import Panah from '../assets/Group48.png'
import Lampu from '../assets/Group47.png'
import Check from '../assets/Group46.png'
import Rempah from '../assets/rempah.png'
import Maskot from '../assets/maskot.png'




function Landing () {
    return (
    <>
    <div className="max-w-[95rem] mx-auto">
        <Navs/>
    </div>

   <section id="beranda" className='max-w-[100rem] mx-auto relative w-full  bg-gradient-to-t from-greenDark to-whitemilk bg-opacity-80 text-white'>
    <div className="text-center pt-20">
        <h1 className='text-5xl font-bold font-mono text-greenDark text-shadow-md mt-10 z-20'>
        Yuk, Kenali <span className='text-white bg-greenDark p-2 '>Empon-Empon</span> Lewat Upload!
        </h1>
        <h2 className='text-greenDark text-2xl mt-4 italic'>
        Kenali lebih dekat tanaman herbal tradisional Indonesia – lengkap dengan manfaat dan ciri-cirinya.
        </h2>
    </div>

    <div className="relative flex justify-center items-end mt-16">
        <img src={DaunAtas} alt="Daun" className="absolute top-[-300px] right-[0%] w-[450px]" />
        <img src={DaunAtas} alt="Daun" className="absolute top-[-300px] right-[0%] w-[450px]" />
        <img src={Empon} alt="Empon" className="z-10 w-[680px]" />
        <img src={DaunBawah} alt="Daun" className="absolute bottom-[-80px] left-[0%] w-[450px]" />
        <img src={DaunBawah} alt="Daun" className="absolute bottom-[-80px] left-[0%] w-[450px]" />

    </div>

    <div className="flex justify-center mt-12 z-50 pb-20">
        <Button label="Mulai Deteksi" variant='brown' className="animate-bounce" link='/deteksi'  />
    </div>
   
    </section>

    <section id="reason" className=" max-w-[100rem] mx-auto pb-20  bg-whitemilk"> 
        <div className="text-center pt-20 mb-10 flex flex-row items-center justify-center">
            <img src={Maskot} alt="maskot" className="w-[100px] mb-4" />
            <h3 className="text-6xl text-black font-bold">
                Why <span className="text-greenDark underline ">EmponPedia?</span>
            </h3>
        </div>

        <div className="flex items-center justify-center mt-20 text-center bg-greenDark p-10 h-[20%] w-[75%] mx-auto gap-x-12 rounded-3xl ">
            <Card gambar={Panah} label={"Akurat"} deskripsi="Model AI kami dilatih dengan ribuan gambar empon-empon asli untuk memberikan hasil deteksi yang tepat dan andal."/>
            <Card gambar={Lampu} label={"Edukatif"} deskripsi="Dapatkan informasi lengkap tentang manfaat, penggunaan, dan fakta menarik dari empon-empon yang terdeteksi."/>
            <Card gambar={Check} label={"Mudah"} deskripsi="Cukup upload foto, dan AI kami akan langsung mengenali jenis empon-empon dengan kecepatan dan kemudahan maksimal."/>
        </div>
       
    </section>

    <section id="quotes" className="bg-greenDark py-16 px-10 flex justify-center max-w-[100rem] mx-auto">
        <div className="max-w-[100rem] w-full flex flex-col md:flex-row items-center gap-3">
            
            <div className="md:w-1/2 w-full flex justify-center">
            <img 
                src={Rempah} 
                alt="Rempah" 
                className="rounded-xl shadow-lg w-[300px] md:w-[400px] object-cover border border-4 border-transparant"
            />
            </div>

            <div className="md:w-1/2 w-full text-white">
            <h2 className="text-white text-5xl font-semibold mb-4">❝Quote❝</h2>
            <p className="text-2xl italic mb-4 ">
                “Traditional herbal medicine, including rhizomes like turmeric and ginger, continues to be used by 
                <span className="font-bold bg-whitemilk ml-2 mr-2 text-black"> 80% of the world’s population </span>
                for primary health care.”
            </p>
            <p className="text-white font-semibold italic">
                — WHO Traditional Medicine Strategy 2014–2023
            </p>
            </div>

        </div>
    </section>






    </>
    )

}

export default Landing;