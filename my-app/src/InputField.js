import React from "react";
import "./App.css"
import { Button, FormGroup, Input, Container, Row } from 'reactstrap';


class MyInputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {noteDisplayText: '', noteDisplayDate: '', noteDisplayTitle: ''};
    }

    userChange = (event) => {
        this.setState({noteDisplayText: event.target.value, noteDisplayDate: new Date().toLocaleString()})
    }

    noteTitleChange = (event) => {
        this.setState({noteDisplayTitle: event.target.value})
    }

    onButtonClick = (event) => {
        if (this.state.noteDisplayText == "") {
            ;
        }
        else {
        event.preventDefault();
        const newNote = {
            userNoteText: this.state.noteDisplayText,
            userNoteDate: this.state.noteDisplayDate,
            userNoteTitle: this.state.noteDisplayTitle,
            key: Date.now()
        }
        this.props.onNewNote(newNote);
        this.setState({noteDisplayText: '', noteDisplayDate:'', noteDisplayTitle:''})
    }
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className="justify-content-center mt-5">
                        <form className="w-50 border border-light rounded shadow p-3 mb-5 bg-white input-field">
                            <FormGroup>
                                <Input onChange={this.noteTitleChange} value={this.state.noteDisplayTitle} placeholder="Title" className="light-grey font-weight-bold mb-2 input-field"/>
                                <Input value={this.state.noteDisplayText} className="my-nerko input-field" onChange={this.userChange} type="textarea" name="text" id="exampleText" placeholder="Noted... 😁"/>
                                <Button color="primary" className="rounded-pill mt-3" size="lg" block onClick={this.onButtonClick}>Add</Button>
                            </FormGroup>
                        </form>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MyInputField;