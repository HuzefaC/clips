import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() modalID: string = '';

  constructor(public modalService: ModalService, public el: ElementRef) {

  }

  ngOnInit(): void {
    // This will solve the issue of modal inheriting CSS from parent elements.
    // Following code will make the modal a child of the body
    document.body.appendChild(this.el.nativeElement)
  }

  closeModal() {
    this.modalService.toggleModal(this.modalID);
  }
}
