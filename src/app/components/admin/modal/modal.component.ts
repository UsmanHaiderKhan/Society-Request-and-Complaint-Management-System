import { Component, OnInit } from '@angular/core';
import { OperationService } from '../../shared/services/operation.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(public operationService: OperationService) {}

  ngOnInit(): void {}
  public deleteRequest(requestId) {
    this.operationService.deleteRequestData(requestId);
  }
}
