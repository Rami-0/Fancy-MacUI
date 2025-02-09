'use client';
import React from 'react';
import css from './Cooperation.module.css';

import Amwal from './assets/Amwal.svg';
import Arzag from './assets/Arzag.svg';
import Bsatt from './assets/Bsatt.svg';
import Huge from './assets/Huge.svg';
import Iktva from './assets/Iktva.svg';
import KFB from './assets/KFB.svg';
import Li_tadom from './assets/Li_tadom.svg';
import SBCandStv from './assets/SBCandStv.svg';
import Sportforal from './assets/Sportforal.svg';
import Wadisafar from './assets/Wadisafar.svg';
import mzg from './assets/mzg.svg';
import ultra from './assets/ultra.svg';
import Image from "next/image";

const Cooperations_arr = [Iktva, Amwal, Wadisafar, KFB, Li_tadom, Arzag, Bsatt, Huge, SBCandStv, Sportforal, mzg, ultra];

const Cooperation = () => {
    return (
        <div className={css.SliderWrapper}>
            <h2>Collaborated</h2>
            <div className={css.sliderElements}>
                {Cooperations_arr.map((e) => {
                    return (
                        <Image src={e} alt='logo'/>
                    );
                })}
            </div>
        </div>
    );
};

export default Cooperation;
