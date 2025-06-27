import WebCamTile from './WebCam';
import { Participant } from '@/types/webCam';

interface WebCamGridProps {
  participants: Participant[];
  myUserId: number;
  adminUsername: string;
  onToggleMedia: (mediaType: 'video' | 'audio', status: boolean) => void;
  onOpenDelegationModal: () => void;
}

const WebCamGrid = ({
  participants,
  myUserId,
  adminUsername,
  onToggleMedia,
  onOpenDelegationModal,
}: WebCamGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {participants.map((participant) => (
        <WebCamTile
          key={participant.userId}
          participant={participant}
          isLocal={participant.userId === myUserId}
          onToggleMedia={onToggleMedia}
          adminUsername={adminUsername}
          onOpenDelegationModal={onOpenDelegationModal}
        />
      ))}
    </div>
  );
};

export default WebCamGrid;
