import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mail-automation-insp',
  templateUrl: './mail-automation-insp.component.html',
  styleUrls: ['./mail-automation-insp.component.scss']
})
export class MailAutomationInspComponent {
  constructor(private router: Router) {}
  ngOnInit() {
    // Open the link when the component is initialized
    window.location.href = 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox';
  }


}
