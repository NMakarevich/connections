import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  SignInModel,
  SignInResponseModel,
  SignUpModel,
} from '../models/auth.model';
import { ProfileModel } from '../models/profile.model';
import { GroupResponse, GroupsList } from '../models/group.model';
import {
  ConversationList,
  CreateConversation,
  PeopleList,
} from '../models/people.model';
import { DialogModel } from '../models/dialog.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  registration(body: SignUpModel) {
    return this.http.post<Response>('registration', body);
  }

  login(body: SignInModel) {
    return this.http.post<SignInResponseModel>('login', body);
  }

  logout() {
    return this.http.delete('logout');
  }

  getProfile() {
    return this.http.get<ProfileModel>('profile');
  }

  updateProfileName(name: string) {
    return this.http.put('profile', { name });
  }

  loadGroups() {
    return this.http.get<GroupsList>('groups/list');
  }

  createGroup(name: string) {
    return this.http.post<GroupResponse>('groups/create', { name });
  }

  deleteGroup(id: string) {
    const params = new HttpParams().set('groupID', id);
    return this.http.delete('groups/delete', { params });
  }

  loadPeople() {
    return this.http.get<PeopleList>('users');
  }

  loadConversations() {
    return this.http.get<ConversationList>('conversations/list');
  }

  createConversation(companion: string) {
    return this.http.post<CreateConversation>('conversations/create', {
      companion,
    });
  }

  loadGroupMessages(id: string, since?: string) {
    let httpParams: HttpParams;
    if (since)
      httpParams = new HttpParams().set('groupID', id).set('since', since);
    else httpParams = new HttpParams().set('groupID', id);
    return this.http.get<DialogModel>('groups/read', { params: httpParams });
  }

  postMessageToDialog(groupID: string, message: string) {
    return this.http.post('groups/append', { groupID, message });
  }

  loadConversationMessages(id: string, since?: string) {
    let httpParams: HttpParams;
    if (since)
      httpParams = new HttpParams()
        .set('conversationID', id)
        .set('since', since);
    else httpParams = new HttpParams().set('conversationID', id);
    return this.http.get<DialogModel>('conversations/read', {
      params: httpParams,
    });
  }

  postMessageToConversation(conversationID: string, message: string) {
    return this.http.post('conversations/append', { conversationID, message });
  }

  deleteConversation(id: string) {
    const params = new HttpParams().set('conversationID', id);
    return this.http.delete('conversations/delete', { params });
  }
}
