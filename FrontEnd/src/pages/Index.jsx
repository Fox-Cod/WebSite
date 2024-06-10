import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';


export default function Index() {
    const [statusTrue, setStatusTrue] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const { t, i18n } = useTranslation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/feedback', formData);
            setStatusTrue('Dados enviados com sucesso!');
            console.log('Resposta do servidor:', response.data);
        } catch (error) {
            console.error('Erro ao enviar dados para o servidor:', error);
            if (error.response) {
                console.error('Resposta do servidor:', error.response.data);
            }
        }
    };

    return (
        <div>
            <section
                className="container-fluid py-sm-7 d-flex justify-content-center align-items-center"
                style={{
                    backgroundImage: "url('/assets/img/bg-parallax.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-8 text-center">
                            <div className="text-overlay mt-10">
                                <h2 className="text-white lead display-3">PRED</h2>
                                <small className='text-white display-6'>Partilha de Recursos Educativos Digitais</small>
                                <p className="lead display-5 text-white">
                                    {t('text_info_home_1')}
                                </p>
                                <Link to="/form" className="btn btn-primary btn-lg rounded-pill">
                                    {t('continue')}
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-10">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center section-title mx-auto">
                                <h1 className="mb-0 display-4">{t('text_info_home_2')}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 pt-4">
                        <div className="col-lg-4">
                            <div className="service-content p-2">
                                <div className="services-icon">
                                    <img src="assets/svg/icons/board-analysis.svg" alt="" className="img-fluid" />
                                </div>
                                <div className="services-desc">
                                    <h2>{t('text_info_home_3')}</h2>
                                    <p className="text-muted">{t('text_info_home_4')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="service-content p-2">
                                <div className="services-icon">
                                    <img src="assets/svg/icons/gifts.svg" alt="" className="img-fluid" />
                                </div>

                                <div className="services-desc">
                                    <h2>{t('text_info_home_5')}</h2>
                                    <p className="text-muted">{t('text_info_home_6')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="service-content p-2">
                                <div className="services-icon">
                                    <img src="assets/svg/icons/hand.svg" alt="" className="img-fluid" />
                                </div>

                                <div className="services-desc">
                                    <h2>{t('text_info_home_7')}</h2>
                                    <p className="text-muted">{t('text_info_home_8')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 pt-2">
                        <div className="col-lg-4">
                            <div className="service-content p-2">
                                <div className="services-icon">
                                    <img src="assets/svg/icons/lamp-control.svg" alt="" className="img-fluid" />
                                </div>

                                <div className="services-desc">
                                    <h2>{t('text_info_home_9')}</h2>
                                    <p className="text-muted">{t('text_info_home_10')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="service-content p-2">
                                <div className="services-icon">
                                    <img src="assets/svg/icons/media.svg" alt="" className="img-fluid" />
                                </div>

                                <div className="services-desc">
                                    <h2>{t('feedback')}</h2>
                                    <p className="text-muted">{t('text_info_home_11')}.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="service-content p-2">
                                <div className="services-icon">
                                    <img src="assets/svg/icons/email-marketing.svg" alt="" className="img-fluid" />
                                </div>

                                <div className="services-desc">
                                    <h2>{t('text_info_home_12')}</h2>
                                    <p className="text-muted">{t('text_info_home_13')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section id="contact-section" className="container py-10">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-12">
                            <div className="text-center section-title mx-auto">
                                <h3 className="mb-0 display-4">{t('contact_us')}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 vertical-content">
                        <div className="col-lg-5">
                            <div className="contact-detail">
                                <p className="pt-4 text-muted pb-3">{t('text_info_home_14')}
                                    <br /><br />
                                    {t('text_info_home_15')}</p>
                                <div className="contact-icon float-left mr-2">
                                    <i className="pe-7s-call"></i>
                                </div>
                                <p>+ ***-***-*13</p>

                                <div className="contact-icon float-left mr-2">
                                    <i className="pe-7s-mail-open"></i>
                                </div>
                                <p>a30600@aemtg.pt</p>

                                <div className="contact-icon float-left mr-2">
                                    <i className="pe-7s-map-marker"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="custom-form mt-4 pt-4">
                                <div id="message"></div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="name">{t('name')}</label>
                                                <input name="name" id="name" type="text" className="form-control" placeholder="Mark" value={formData.name} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="email">{t('email')}</label>
                                                <input name="email" id="email" type="email" className="form-control" placeholder="Mark2093@example.com" value={formData.email} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="message">{t('message')}</label>
                                                <textarea name="message" id="message" rows="4" className="form-control" placeholder="Hi, i have a question..." value={formData.message} onChange={handleChange} ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 mt-3">
                                            <input type="submit" id="submit" name="send" className="btn btn-primary" value={t('confirm')} />
                                            <div className='text-success' id="simple-msg">{statusTrue}</div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
