import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationDialogPageComponent } from './conversation-dialog-page.component';

describe('ConversationDialogPageComponent', () => {
  let component: ConversationDialogPageComponent;
  let fixture: ComponentFixture<ConversationDialogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationDialogPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConversationDialogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
