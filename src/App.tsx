import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import EpisodeList from "./EpisodeList";
import CharacterGrid from "./CharacterGrid";

interface Episode {
  id: number;
  name: string;
}

interface Character {
  id: number;
  name: string;
  image: string;
}

const App: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  // Fetch initial data (episodes and characters) on component mount
  useEffect(() => {
    // Fetch episodes
    axios
      .get("https://rickandmortyapi.com/api/episode")
      .then((response) => setEpisodes(response.data.results))
      .catch((error) => console.error("Error fetching episodes:", error));

    // Fetch initial characters on page load
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => setCharacters(response.data.results))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  const fetchInitialCharacters = () => {
    // Fetch initial characters again when reverting back
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => setCharacters(response.data.results))
      .catch((error) =>
        console.error("Error fetching initial characters:", error)
      );
  };

  const handleEpisodeClick = (episodeId: number) => {
    // If the clicked episode is already selected, reset to initial characters
    if (selectedEpisode === episodeId) {
      setSelectedEpisode(null); // Unselect the episode
      fetchInitialCharacters(); // Revert to the initial page load view
    } else {
      // Select a new episode and fetch its characters
      setSelectedEpisode(episodeId);
      axios
        .get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
        .then((response) => {
          const characterPromises = response.data.characters.map(
            (url: string) => axios.get(url)
          );
          Promise.all(characterPromises)
            .then((responses) =>
              setCharacters(responses.map((resp) => resp.data))
            )
            .catch((error) =>
              console.error("Error fetching episode characters:", error)
            );
        })
        .catch((error) => console.error("Error fetching episode:", error));
    }
  };

  return (
    <Container fluid>
      <h1 className="my-4 text-center">Rick and Morty Characters</h1>
      <Row>
        <Col xs={3}>
          <EpisodeList
            episodes={episodes}
            onEpisodeClick={handleEpisodeClick}
            selectedEpisode={selectedEpisode}
          />
        </Col>
        <Col xs={9}>
          <CharacterGrid characters={characters} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
