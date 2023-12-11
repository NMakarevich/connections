export interface DialogModel {
  Count: number;
  Items: DialogMessage[];
  refreshTime: number;
}

export interface DialogMessage {
  authorID: {
    S: string;
  };
  message: {
    S: string;
  };
  createdAt: {
    S: string;
  };
}

export interface MessageWithAuthorName extends DialogMessage {
  authorName: string;
}
