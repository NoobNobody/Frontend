import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './categories_page.css'
import categoryImages from '../../utils/categoryImages';

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/kategorie/')
            .then(response => {
                setCategories(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleCardClick = (categoryId) => {
        navigate(`/oferty/kategoria/${categoryId}`);
    };

    return (
        <Container fluid>
            <h2>Kategorie</h2>
            <Row xs={1} md={4} className="g-4">
                {categories.map((category) => {
                    const categoryImage = categoryImages[category.Category_name] || categoryImages['default'];
                    return (
                        <Col key={category.id}>
                            <Card className="card-hoverable" onClick={() => handleCardClick(category.id)}>
                                <Card.Img
                                    src={categoryImage}
                                    alt="Card image"
                                    className="categories_img"
                                />
                                <Card.ImgOverlay className="d-flex">
                                    <div className="card_bottom_gradient">
                                        <Card.Title>{category.Category_name}</Card.Title>
                                        <Card.Text>
                                            Ilość ofert: {category.offers_count}
                                        </Card.Text>
                                    </div>
                                </Card.ImgOverlay>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}


export default CategoriesPage;