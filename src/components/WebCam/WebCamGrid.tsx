import WebCamTile from './WebCam';
import { Participant } from '@/types/webCam';

interface WebCamGridProps {
  participants: Participant[];
  myUserId: number;
  onToggleMedia: (mediaType: 'video' | 'audio', status: boolean) => void;
}

const WebCamGrid = ({ participants, myUserId, onToggleMedia }: WebCamGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {participants.map((participant) => (
        <WebCamTile
          key={participant.userId}
          participant={participant}
          isLocal={participant.userId === myUserId}
          onToggleMedia={onToggleMedia} 
        />
      ))}
    </div>
  );
};

export default WebCamGrid;