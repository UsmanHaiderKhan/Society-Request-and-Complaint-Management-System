import { Component, OnInit } from '@angular/core';
import { ComplainService } from '../../shared/services/complain.service';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.scss'],
})
export class ComplainComponent implements OnInit {
  optionsSelect: Array<any>;
  complain: string;
  fullname: string;
  email: string;
  address: string;
  phonenumber: number;
  complainType: string;
  complainDetails: string;
  message: string;
  constructor(public complainService: ComplainService) {}

  ngOnInit(): void {
    this.optionsSelect = [
      { value: 'disabled', label: '-- Select Complain-Type --' },
      { value: 'Normal', label: 'Normal' },
      { value: 'Severe', label: 'Severe' },
      { value: 'Urgent', label: 'Urgent' },
    ];
  }
  submitComplain() {
    let Complain = {};
    Complain['fullname'] = this.fullname;
    Complain['email'] = this.email;
    Complain['address'] = this.address;
    Complain['phonenumber'] = this.phonenumber;
    Complain['complainType'] = this.complainType;
    Complain['complainDetails'] = this.complainDetails;
    this.complainService
      .submitComplain(Complain)
      .then((res) => {
        this.fullname = '';
        this.email = '';
        this.address = '';
        this.phonenumber = undefined;
        this.complainType = '';
        this.complainDetails = '';
        console.log(res);
        this.message = 'Complain has been Submitted Successfully.';
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
