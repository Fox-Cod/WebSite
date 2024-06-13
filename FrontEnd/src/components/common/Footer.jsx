import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    return (
        <div>
            <div className="container">
                <footer className="py-0 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li><Link to="/"><img src="/assets/img/logo/RbgBrain.png" width="29" height="29" /></Link></li>
                        <li><Link to="/about-us" className="nav-link text-body">{t('about')}</Link></li>
                        <li><a onClick={() => changeLanguage('pt')} className="nav-link text-body" role="button">PT</a></li>
                        <li><a onClick={() => changeLanguage('en')} className="nav-link text-body" role="button">EN<sup>Beta</sup></a></li>
                    </ul>

                    <p className="text-center">&copy; 2023 TeamTeach</p>
                </footer>
            </div>
        </div>
    )

}
