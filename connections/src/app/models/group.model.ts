export interface GroupItem {
  id: {
    S: string;
  };
  name: {
    S: string;
  };
  createdAt: {
    S: string;
  };
  createdBy: {
    S: string;
  };
}

export interface GroupsList {
  Count: number;
  Items: GroupItem[];
}

export interface GroupResponse {
  groupID: string;
}
