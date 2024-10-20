import React from 'react';
import { ListGroup } from 'react-bootstrap';

interface EpisodeListProps {
  episodes: { id: number; name: string }[];
  onEpisodeClick: (id: number) => void;
  selectedEpisode: number | null;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes, onEpisodeClick, selectedEpisode }) => {
  return (
    <div style={{ height: '500px', overflowY: 'auto' }}> {/* Scrollable list */}
      <ListGroup>
        {episodes.map((episode) => (
          <ListGroup.Item
            key={episode.id}
            action
            onClick={() => onEpisodeClick(episode.id)}
            active={selectedEpisode === episode.id}
          >
            {episode.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default EpisodeList;
