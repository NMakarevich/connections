export interface DialogModel {
  Count: number;
  Items: DialogMessage[];
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
