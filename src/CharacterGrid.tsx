
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

interface CharacterGridProps {
  characters: { id: number; name: string; image: string }[];
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ characters }) => {
  return (
    <Row>
      {characters.map((character) => (
        <Col key={character.id} md={4} lg={3} className="mb-4">
          <Card>
            <Card.Img variant="top" src={character.image} />
            <Card.Body>
              <Card.Title>{character.name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CharacterGrid;
