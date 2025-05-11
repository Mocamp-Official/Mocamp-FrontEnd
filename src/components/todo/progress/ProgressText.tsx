interface ProgressTextProps {
  progress: number;
}

const getMessage = (progress: number) => {
  if (progress === 100) return '완벽해요! 오늘의 목표 달성';
  if (progress >= 80) return '거의 다 왔어요!';
  if (progress >= 50) return '좋아요! 절반 넘었어요';
  if (progress >= 20) return '천천히 올라가고 있어요';
  return '시작이 반이에요!';
};

const ProgressText = ({ progress }: ProgressTextProps) => {
  return (
    <p className="ml-5 text-xl font-medium text-[#555555]">
      {getMessage(progress)}
    </p>
  );
};

export default ProgressText;
