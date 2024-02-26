import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { DataClass } from '../models/data.class';
import { Data } from '../intefaces/data.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  dataForm: FormGroup;
  valuePercentage: number = 5; //Juros fixo de 5%
  data: Data;
  dataItems: Data[];
  dataReturn: DataClass;
  dataReturnCalculate: DataClass;
  isHighlighted: boolean = false;

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      value: [null, Validators.required],
      instalments: [null, Validators.required],
      fees: [null],
      valueInstalment: [null],
      total: [null]
    });

    this.readItens();
  }

  openModal() {
    if (!this.dataForm.valid) {
      return this.markFormGroupTouched(this.dataForm);
    }
    this.isHighlighted = true;
  }

  onConfirmAction() {
    console.log('Confirm button clicked!');
    this.isHighlighted = false;
    this.createItem();
  }
  onCancelAction() {
    console.log('Cancel button clicked!');
    this.isHighlighted = false;
  }


  readItens(): void {
    this.dataService.readHttp().subscribe(
      response => {
        this.dataItems = response;
      },
      error => {
        console.error('Error getting data:', error);
      }
    );
  }

  calculateItem(): void {

    if (!this.dataForm.valid) {
      return this.markFormGroupTouched(this.dataForm);
    }

    const formData = this.dataForm.value;
    formData.fees = this.valuePercentage;

    const dataClass = new DataClass(formData);

    this.dataService.calculateHttp(dataClass).subscribe(
      response => {
        this.dataReturnCalculate = response;
        console.log(this.dataReturnCalculate);
        this.readItens();
      },
      error => {
        console.error('Error sending data:', error);
      }
    );
  }

  createItem(): void {
    this.dataService.createHttp(this.dataReturnCalculate).subscribe(
      response => {
        this.dataReturn = response;
        this.dataReturnCalculate = null;
        this.readItens();
        this.clearForm();
      },
      error => {
        console.error('Error saved data:', error);
      }
    );
  }

  clearForm() {
    this.dataForm.reset({});
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}