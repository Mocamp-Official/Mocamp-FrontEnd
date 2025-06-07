export interface Goal {
  goalId: number;
  content: string;
  isCompleted: boolean;
}

export interface Participant {
  userId: number;
  userSeq: string;
  username: string;
  goals: Goal[];
  resolution: string;
}
