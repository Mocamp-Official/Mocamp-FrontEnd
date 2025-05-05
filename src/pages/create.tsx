/* 모캠프(방) 생성 페이지 */
import { useState } from 'react';
import CreateRoom from '@/components/create/CreateRoom';

const Create = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div onClick={() => setIsOpen(true)}>create</div>
      {isOpen && <CreateRoom onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Create;
