import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";


export default function Index() {
    const [statusTrue, setStatusTrue] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

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
                                <h2 className="text-white mb-4 lead display-3">TeamTeach</h2>
                                <p className="lead display-5 text-white">
                                    Mergulhe num mundo de conhecimentos no nosso sítio Web, que inclui materiais educativos para melhorar a sua experiência em vários domínios
                                </p>
                                <Link to="/form" className="btn btn-primary btn-lg rounded-pill">
                                    Continuar
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ScrollLink to="contact-section" smooth={true} duration={500}>
                ...
            </ScrollLink>


            <section className="bg-white py-10">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center section-title mx-auto">
                                <small className="pb-2 text-muted"> ?</small>
                                <h1 className="mb-0 display-4">Serviços</h1>
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
                                    <h2>Planeamento e análise</h2>
                                    <p className="text-muted">Aprenda algo novo e útil. Publique os seus planos ou apresentações para partilhar a sua experiência com outros utilizadores.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="service-content p-2">
                                <div className="services-icon">
                                    <img src="assets/svg/icons/gifts.svg" alt="" className="img-fluid" />
                                </div>

                                <div className="services-desc">
                                    <h2>Conceção e visualização</h2>
                                    <p className="text-muted">Consulte a lista de ferramentas para o seu trabalho, onde serão fornecidas ligações para essas ferramentas e as respectivas descrições.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="service-content p-2">
                                <div className="services-icon">
                                    <img src="assets/svg/icons/hand.svg" alt="" className="img-fluid" />
                                </div>

                                <div className="services-desc">
                                    <h2>Comunicação e cooperação</h2>
                                    <p className="text-muted">Crie a sua própria equipa privada para partilhar tópicos e ideias interessantes com outros membros.</p>
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
                                    <h2>Criatividade e inspiração</h2>
                                    <p className="text-muted">No nosso sítio, pode partilhar conteúdos interessantes que podem inspirar os outros a agir ou a superarem-se a si próprios.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="service-content p-2">
                                <div className="services-icon">
                                    <img src="assets/svg/icons/media.svg" alt="" className="img-fluid" />
                                </div>

                                <div className="services-desc">
                                    <h2>Feedback</h2>
                                    <p className="text-muted">Obter apoio amigável da nossa equipa a qualquer momento, porque estamos aqui para nos ajudarmos mutuamente a superar desafios, atingir objectivos e partilhar a alegria dos sucessos.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="service-content p-2">
                                <div className="services-icon">
                                    <img src="assets/svg/icons/email-marketing.svg" alt="" className="img-fluid" />
                                </div>

                                <div className="services-desc">
                                    <h2>Apoio amigável</h2>
                                    <p className="text-muted">Os amigos com interesses e objectivos comuns podem ser a chave para uma cooperação bem sucedida e para a partilha de experiências.</p>
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
                                <small className="pb-2 text-muted">?</small>
                                <h3 className="mb-0 display-4">Contactar-nos</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 vertical-content">
                        <div className="col-lg-5">
                            <div className="contact-detail">
                                <p className="pt-4 text-muted pb-3">Estamos sempre abertos à comunicação e prontos para o ajudar com quaisquer questões que possa ter. Não hesite em contactar-nos com as suas sugestões, comentários, preocupações ou dúvidas. A sua opinião é importante para nós e esforçamo-nos por garantir a sua satisfação com o nosso sítio Web.
                                    <br /><br />
                                    Preencha o formulário abaixo ou contacte-nos através dos dados de contacto fornecidos e tentaremos responder-lhe o mais rapidamente possível..</p>
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
                                                <label htmlFor="name">Nome</label>
                                                <input name="name" id="name" type="text" className="form-control" placeholder="O seu nome..." value={formData.name} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="email">E-mail</label>
                                                <input name="email" id="email" type="email" className="form-control" placeholder="O seu e-mail..." value={formData.email} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label htmlFor="message">Mensagem</label>
                                                <textarea name="message" id="message" rows="4" className="form-control" placeholder="A sua mensagem..." value={formData.message} onChange={handleChange} ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 mt-3">
                                            <input type="submit" id="submit" name="send" className="btn btn-primary" value="Enviar mensagem" />
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
