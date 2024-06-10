import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { adminAddNote } from '../../api/deviceAPI';

export default function AddRecordModal({ show, handleClose }) {
    const [selectedTable, setSelectedTable] = useState('_Years');
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePrimarySubmit = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmSubmit = async () => {
        try {
            setErrorMessage('');
            const response = await adminAddNote(selectedTable, formData);
            console.log('Record added successfully:', response.data);
            setFormData({});
            setShowConfirmModal(false);
            handleClose();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.Message) {
                setErrorMessage(error.response.data.Message);
            } else {
                setErrorMessage('Ocorreu um erro ao adicionar o registro');
            }
            console.error('Ocorreu um erro ao adicionar o registro:', error);
            setShowConfirmModal(false);
        }
    };

    const renderForm = () => {
        switch (selectedTable) {
            case '_Years':
                return (
                    <Form.Group controlId="formYear">
                        <Form.Label>Ano</Form.Label>
                        <Form.Control
                            type="text"
                            name="year"
                            value={formData.year || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                );
            case '_Schools':
                return (
                    <>
                        <Form.Group controlId="formSchoolName">
                            <Form.Label>Nome da escola</Form.Label>
                            <Form.Control
                                type="text"
                                name="schoolName"
                                value={formData.schoolName || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </>
                );
            case '_Educations':
                return (
                    <Form.Group controlId="formEducationLevel">
                        <Form.Label>Nível</Form.Label>
                        <Form.Control
                            type="text"
                            name="educationLevel"
                            value={formData.educationLevel || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                );
            case '_Subjects':
                return (
                    <Form.Group controlId="formSubjectName">
                        <Form.Label>Nome da disciplina</Form.Label>
                        <Form.Control
                            type="text"
                            name="subjectName"
                            value={formData.subjectName || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                );
            case '_Groups':
                return (
                    <>
                        <Form.Group controlId="formGroupCod">
                            <Form.Label>Código de grupo</Form.Label>
                            <Form.Control
                                type="text"
                                name="groupCod"
                                value={formData.groupCod || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formGroupName">
                            <Form.Label>Nome do grupo</Form.Label>
                            <Form.Control
                                type="text"
                                name="groupName"
                                value={formData.groupName || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicione uma anotação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTableSelect">
                            <Form.Label>Selecione a tabela</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedTable}
                                onChange={(e) => setSelectedTable(e.target.value)}
                            >
                                <option value="_Years">Years</option>
                                <option value="_Schools">Schools</option>
                                <option value="_Educations">Educations</option>
                                <option value="_Subjects">Subjects</option>
                                <option value="_Groups">Groups</option>
                            </Form.Control>
                        </Form.Group>

                        {renderForm()}

                    {errorMessage && <p className="mt-3 mb-0 text-danger">Error: {errorMessage}</p>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handlePrimarySubmit}>
                        Adicionar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar ação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Você tem certeza que deseja adicionar este registro?</p>
                    <p>Voce que addisionar: {(formData.year)} {(formData.educationLevel)} {(formData.subjectName)} {(formData.groupName)} {(formData.groupCod)} {(formData.schoolName)}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmSubmit}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
