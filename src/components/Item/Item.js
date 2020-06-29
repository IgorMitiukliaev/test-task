import React from 'react'
import Tag from "../Tag/Tag";
import {Container, Row, Col} from 'reactstrap';
import ChangeStatusLabel from '../ChangeStatusLabel/ChangeStatusLabel'
import './item.css'

const Item = (props) => {
    const {author, title, description, tags} = props;

    const tagLabel = tags.map((e, i) =>
        <Tag
            key={i}
            tag={e}/>);
    return (<Container className='item'>
        <Row>
            <Col className='column'>
            <p className='author'>{author}</p>
            </Col>
        </Row>
        <Row>
            <Col sm='10'>
                <h4 className='title'>{title}</h4>
            </Col>
            <Col>
                <ChangeStatusLabel item={props}/>
            </Col>
        </Row>
        <Row>
            <Col>
            <p className='description'>{description}</p>
            </Col>
        </Row>
        <Row>
            <Col>
            <p className='tags'>{tagLabel}</p>
            </Col>
        </Row>
        <hr/>
    </Container>)
};

export default Item