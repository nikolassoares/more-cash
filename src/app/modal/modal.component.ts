import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Data } from '../intefaces/data.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() data: any;
  
  @Output() confirmed: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  
  // @Input() modalContent: string;
  @Input() isHighlighted: boolean = false;



  confirmAction() {
    this.confirmed.emit();
    this.toggleHighlight();
  }

  cancelAction() {
    this.confirmed.emit();
    this.toggleHighlight();
  }

  toggleHighlight() {
    this.isHighlighted = false;
  }


  constructor() { }

  ngOnInit(): void {
    console.log("modal");
    console.log(this.data);
  }

  // onCloseModal() {
  //   this.closeModal.emit();
  // }

}
