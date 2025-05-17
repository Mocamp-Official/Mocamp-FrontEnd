import { ReactNode } from 'react';
import CommentIcon from '@/public/svgs/comment_icon.svg';

interface BottomCommentProps {
  children: ReactNode;
}

const BottomComment = ({ children }: BottomCommentProps) => {
  return (
    <div className="flex relative justify-center mt-2">
      <CommentIcon />
      <p className="absolute inset-0 flex items-center justify-center text-base font-medium text-[#00af83]">
        {children}
      </p>
    </div>
  );
};

export default BottomComment;
