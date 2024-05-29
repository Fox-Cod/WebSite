import React from 'react';

export default function About() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="p-3">
                        <h1 className="display-4 text-center mb-4">Sobre Nós</h1>
                        <p className="lead text-center">Bem-vindo ao nosso site!</p>
                        <p>
                            Nosso site é uma plataforma para comunicação entre professores, onde eles podem compartilhar suas atividades, arquivos, planos e apresentações para facilitar seu trabalho e melhorar o processo de ensino.
                        </p>
                        <h3 className="mt-4">Funcionalidades</h3>
                        <ul>
                            <li>Compartilhamento de arquivos: os professores podem carregar e compartilhar documentos, apresentações e outros materiais.</li>
                            <li>Planejamento colaborativo: possibilidade de criar e editar planos de aula e currículos em conjunto.</li>
                            <li>Criação de equipes: qualquer usuário pode criar sua equipe para realizar projetos, desenvolver planos ou outras atividades com seus colegas.</li>
                            <li>Integração com ferramentas: acesso a ferramentas de terceiros que facilitam o trabalho dos professores, com links diretos para elas.</li>
                        </ul>
                        <h3 className="mt-4">Nossa Missão</h3>
                        <p>
                            Nossa missão é fornecer aos professores uma plataforma conveniente e eficaz para colaboração, compartilhamento de conhecimentos e recursos. Buscamos tornar o processo de ensino o mais produtivo e interessante possível, tanto para os professores quanto para os alunos.
                        </p>
                        <h3 className="mt-4">Por Que Escolher-nos?</h3>
                        <p>
                            Entendemos a importância da colaboração e do compartilhamento de conhecimentos no ambiente educacional. Nossa plataforma oferece:
                        </p>
                        <ul>
                            <li>Facilidade de uso: interface intuitiva que não requer longos treinamentos.</li>
                            <li>Segurança de dados: garantimos um alto nível de proteção dos seus dados e materiais.</li>
                            <li>Suporte comunitário: uma comunidade ativa de professores pronta para ajudar e compartilhar seus conhecimentos e experiências.</li>
                        </ul>
                        <h3 className="mt-4">Contatos</h3>
                        <p>
                            Se você tiver dúvidas ou sugestões, não hesite em nos contatar:
                        </p>
                        <ul>
                            <li>Email: support@yourwebsite.com</li>
                            <li>Telefone: +1 (800) 123-4567</li>
                            <li>Endereço: Rua Exemplo, 123, Cidade Exemplar</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
