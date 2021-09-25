import { Modal, Button } from 'react-bootstrap';
import { LeaderBoard } from './LeaderBoard';


export const LeaderBoardModal = ({show, onHide}) => {

    return(
        <Modal
        enforceFocus={true}
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            Leaderboard
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <LeaderBoard />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    )
}