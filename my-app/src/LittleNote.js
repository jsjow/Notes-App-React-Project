import React from 'react';
import {
    Card, CardBody, Container, Row, Button, CardColumns, CardTitle, ModalBody
} from 'reactstrap';
import "./App.css";
import Modal from 'react-modal';

Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        transition: "all 500ms ease-in-out"
    }
};


class LittleNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modalIsOpen: false, currentNoteText: '', currentNoteDate: '', currentNoteTitle: '', currentNoteKey: ''};
    }

    mySatesFunc = (one, two, three, four) => {
        this.setState({ currentNoteTitle: one, currentNoteDate: two, currentNoteText: three, currentNoteKey: four});
    }

    titleInputChange = (event) => {
        this.setState({currentNoteTitle: event.target.value})
    }

    textInputChange = (event) => {
        this.setState({currentNoteText: event.target.value})
    }

    clickNoteChange = () => {
        const updatedNote = {
            userNoteText: this.state.currentNoteText,
            userNoteDate: new Date().toLocaleString(),
            userNoteTitle: this.state.currentNoteTitle,
            userNoteKey: this.state.currentNoteKey
        }
        this.props.changeNote(updatedNote);
        this.setState({modalIsOpen: false})
    }

    render() {
        return (
            <Container className="my-roboto">
                <Row>
                    <div className="offset-1 col-10">
                        <Row className="align-items-center justify-content-center">
                            <CardColumns>
                                {this.props.notes.map((note) => {
                                    return (
                                        <div key={note.key}>
                                            <Card onClick={() => this.mySatesFunc(note.userNoteTitle, note.userNoteDate, note.userNoteText, note.key)}>
                                                <Button className="mr-2 block" color="danger mt-2 x-size" onClick={() => { this.props.deleteIt(note.key) }}>x</Button>
                                                <CardBody onClick={() => this.setState({ modalIsOpen: true })} className="border-success mr-2 mb-2 cards">
                                                    <CardTitle className="mt-4 ml-3 input-title">{note.userNoteTitle}</CardTitle>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                    </div>
                                                    <div className="light-grey">{note.userNoteDate}</div>
                                                    <div className="mt-2">{note.userNoteText}</div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    )
                                })}
                            </CardColumns>
                            <Modal isOpen={this.state.modalIsOpen} onRequestClose={() => this.setState({ modalIsOpen: false})} style={customStyles}>
                                <ModalBody>
                                <input onChange={this.titleInputChange} value={this.state.currentNoteTitle}></input>
                                <input onChange={this.textInputChange} value={this.state.currentNoteText}></input>
                                <button onClick={this.clickNoteChange}>Update</button>
                                </ModalBody>
                            </Modal>
                        </Row>
                    </div>
                </Row>
            </Container>
        )
    }
}

export default LittleNote;