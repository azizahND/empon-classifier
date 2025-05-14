import React, { useState } from 'react';
import Empon from '../assets/Group45.png'
import DaunBawah from '../assets/Group43.png'
import Button from '../components/Button'
import Navs from '../components/Navs'




function Landing () {
    return (
    <>
    <div className="">
        <Navs/>
    </div>
   <section id="beranda" className='relative w-full h-screen bg-gradient-to-t from-greenDark to-whitemilk bg-opacity-80 text-white'>
    <div className="text-center pt-20">
        <h1 className='text-5xl font-bold font-mono text-greenDark text-shadow-md mt-10'>
        Yuk, Kenali <span className='text-white bg-greenDark p-2'>Empon-Empon</span> Lewat Upload!
        </h1>
        <h2 className='text-greenDark text-2xl mt-4 italic'>
        Kenali lebih dekat tanaman herbal tradisional Indonesia – lengkap dengan manfaat dan ciri-cirinya.
        </h2>
    </div>

    <div className="relative flex justify-center items-end mt-16">
        <img src={Empon} alt="Empon" className="z-10" />
        <img src={DaunBawah} alt="Daun" className="absolute bottom-[-60px] left-[0%] w-[450px]" />
    </div>

    <div className="flex justify-center mt-10 z-20">
        <Button label="Mulai Deteksi" variant='green' />
    </div>
    <div className="text-center mt-20 text-4xl text-black font-bold mb-20">
        <h3>Why EmponPedia?</h3>
    </div>
    </section>

    <section id="reason" >

    </section>


    </>
    )

}

export default Landing;