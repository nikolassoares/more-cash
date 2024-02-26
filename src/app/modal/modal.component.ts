import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() data: any;
  @Input() isHighlighted: boolean = false;
  @Output() confirmed: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  confirmAction() {
    this.confirmed.emit();
    alert('O empréstimo foi realizado com sucesso! Veja abaixo o que você contratou.');
    this.toggleHighlight();
  }

  cancelAction() {
    this.confirmed.emit();
    this.toggleHighlight();
  }

  toggleHighlight() {
    this.isHighlighted = false;
  }

}