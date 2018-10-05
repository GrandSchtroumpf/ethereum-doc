import { Addresses } from './../../models/doc';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ]
})
export class AddressesComponent implements OnInit {

  public addresses: Addresses;

  constructor(
    private dialogRef: MatDialogRef<AddressesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Addresses
  ) { }

  ngOnInit() {
    const init: Addresses = {
      ropsten: '',
      mainnet: '',
      kovan: '',
      rinkeby: ''
    };
    this.addresses = { ...init, ...this.data };
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
