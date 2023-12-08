export interface PeopleList {
  Count: number;
  Items: UserItem[];
}

export interface UserItem {
  name: {
    S: string;
  };
  uid: {
    S: string;
  };
}

export interface ConversationList {
  Count: number;
  Items: ConversationItem[];
}

export interface ConversationItem {
  id: {
    S: string;
  };
  companionID: {
    S: string;
  };
}

export interface ConversationObject {
  source: {
    [id: string]: ConversationItem;
  };
  Count: number;
}

export interface PeopleListWithConversations {
  peopleList: UserItem[];
  conversations: {
    [id: string]: ConversationItem;
  };
}

export interface CreateConversation {
  conversationID: string;
}
