import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ActorData } from "../../state/Definitions";

export const UnitPanel: React.FC<{unit: ActorData}> = props => {
    return(
        <Container fluid>
            <Row>
                <Col>
                    <b>{props.unit.name}</b>
                </Col>
            </Row>
            <Row>
                <Col>
                    <b><i className="ra ra-hearts"></i>&nbsp;{props.unit.curHP}/{props.unit.maxHP}</b>
                </Col>
            </Row>
            <Row>
                <Col>
                    <b><i className="ra ra-sideswipe"></i>&nbsp;{props.unit.move}</b>
                </Col>
            </Row>
            <Row>
                <Col>
                    <b><i className="ra ra-overhead"></i>&nbsp;{props.unit.jump}</b>
                </Col>
            </Row>
        </Container>
    );
}