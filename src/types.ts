export type Clip = {
  id: string;
  name?: string;
  selector?: string;
  browserWidth?: number;
};

export type SavedState = {
  url?: string;
  clips?: Clip[];
};
