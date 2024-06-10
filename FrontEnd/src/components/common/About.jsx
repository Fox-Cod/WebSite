import React from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
    const { t, i18n } = useTranslation();
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="p-3">
                        <h1 className="display-4 text-center mb-4">{t('text_info_about_1')}</h1>
                        <p className="lead text-center">{t('text_info_about_2')}</p>
                        <p>
                        {t('text_info_about_3')}
                        </p>
                        <h3 className="mt-4">{t('text_info_about_4')}</h3>
                        <ul>
                            <li>{t('text_info_about_5')}</li>
                            <li>{t('text_info_about_6')}</li>
                            <li>{t('text_info_about_7')}</li>
                            <li>{t('text_info_about_8')}</li>
                        </ul>
                        <h3 className="mt-4">{t('text_info_about_9')}</h3>
                        <p>
                        {t('text_info_about_10')}
                        </p>
                        <h3 className="mt-4">{t('text_info_about_11')}</h3>
                        <p>
                        {t('text_info_about_12')}
                        </p>
                        <ul>
                            <li>{t('text_info_about_13')}</li>
                            <li>{t('text_info_about_14')}</li>
                            <li>{t('text_info_about_15')}</li>
                        </ul>
                        <h3 className="mt-4">{t('text_info_about_16')}</h3>
                        <p>
                        {t('text_info_about_17')}
                        </p>
                        <ul>
                            <li>{t('email')}: support@yourwebsite.com</li>
                            <li>{t('phone')}: +1 (800) 123-4567</li>
                            {/* <li>{t('text_info_about_1')}: Rua Exemplo, 123, Cidade Exemplar</li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
