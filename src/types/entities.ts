export interface Church {
  id: string;
  name: string;
  location: string;
  images: string[];
  head_pastor: string;
  members: number;
  income: number;
}

export type ClergyType = "Bishop" | "Mother" | "Sister" | "Reverend" | "Pastor";

export interface Pastor {
  id: string;
  name: string;
  age: number;
  position: string;
  profile_image: string;
  clergy_type: ClergyType;
}
