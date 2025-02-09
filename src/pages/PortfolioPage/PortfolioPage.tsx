import css from './PortfolioPage.module.css';
// import Card from '@/components/Card/Card';
import Contacts from '@/components/contacts/Contacts';
// import {myProjects2} from '@/constants/Projects';
// import Lottie_Main from '@/components/lottie/Lottie_Main';
import Logo2 from '@/assets/img/Animation.gif';
import Image from "next/image";
import Link from "next/link";
import Cooperation from "@/components/cooperation/Cooperation";

const PortfolioPage = () => {
    return (
        <>
            <main id='Home' className={css.main}>
                <div className={css.logoDiv}>
                    <Image src={Logo2} alt='logo' className={css.mainLogo + ' hover'}/>
                </div>
            </main>
            <Cooperation/>
        </>
    );
};

export default PortfolioPage;
