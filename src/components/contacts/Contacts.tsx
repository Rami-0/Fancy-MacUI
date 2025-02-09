import React from "react";
import { FaLinkedin, FaWhatsappSquare, FaBehanceSquare ,FaInstagramSquare} from "react-icons/fa";
import css from "./Contacts.module.css";
import Link from "next/link";
// const style = {
// 	width: 40 + "px",
//   height:40 + "px"
// };

const Contacts = () => {
	return (
		<div className={css.footer}>
			<Link to={"https://www.linkedin.com/in/raji-alshalabi/"} target="_blank" className={css.link}>
				<FaLinkedin className={css.icon} />
			</Link>
			<Link to={"https://api.whatsapp.com/message/H4HSHHPMESVJE1?autoload=1&app_absent=0"} target="_blank" className={css.link}>
				<FaWhatsappSquare className={css.icon} />
			</Link>
			<Link to={"https://www.behance.net/rajishalabi"} target="_blank" className={css.link}>
				<FaBehanceSquare className={css.icon} />
			</Link>
			<Link to={"https://www.instagram.com/raji.shalabi/?igshid=MzRlODBiNWFlZA%3D%3D"} target="_blank" className={css.link}>
				<FaInstagramSquare className={css.icon} />
			</Link>
		</div>
	);
};

export default Contacts;
