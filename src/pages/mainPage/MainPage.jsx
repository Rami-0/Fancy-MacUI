import css from './MainPage.module.css';
import Logo2 from '../../../public/assets/img/Animation.gif';
import Card from '../../components/Card/Card';
import Contacts from '../../components/contacts/Contacts';
import { myProjects } from '../../constants/Projects';
import Cooperation from '../../components/cooperation/Cooperation';

const MainPage = () => {
	return (
		<>
			{/*<main id='Home' className={css.main}>*/}
			{/*	<div className={css.logoDiv}>*/}
			{/*		<img src={Logo2} alt='logo' className={css.mainLogo + ' hover'} />*/}
			{/*	</div>*/}

			{/*	<AnchorLink offset='20px' href='#header'>*/}
			{/*		/!*<Lottie_Main />*!/*/}
			{/*	</AnchorLink>*/}
			{/*</main>*/}
			{/*<header id='header' className={css.header + ' containerPadded reveal'}>*/}
			{/*	<AnchorLink className={'hover'} href='#Home'>*/}
			{/*		Home*/}
			{/*	</AnchorLink>*/}
			{/*	<AnchorLink className={'hover'} offset='20px' href='#portfolio'>*/}
			{/*		Portfolio*/}
			{/*	</AnchorLink>*/}
			{/*	<AnchorLink className={'hover'} href='#'>*/}
			{/*		About Me*/}
			{/*	</AnchorLink>*/}
			{/*</header>*/}

			{/*<Cooperation />*/}

			<p className={css.sectionLable + ' containerPadded reveal'}>Portfolio</p>
			<section id='portfolio' className={css.section + ' container'}>
				<div className={css.cards + ' containerPadded reveal'}>
					{myProjects.map((elem) => {
						return <Card key={elem.id} img={elem.img} title={elem.name} description={elem.description} link={elem.link} />;
					})}
				</div>
				{/*<section className={css.Contacts}>*/}
				{/*	<Contacts />*/}
				{/*</section>*/}
			</section>
		</>
	);
};

export default MainPage;
