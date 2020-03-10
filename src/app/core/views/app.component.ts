import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { ToasterMessageService } from '../services';
import * as fromCoreStore from '../@redux/core.reducer';
import * as fromCoreActions from '../@redux/actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true }) toastContainer: ToastContainerDirective;

  constructor(
    private toastrService: ToastrService,
    private messageService: ToasterMessageService,
    private store: Store<fromCoreStore.CoreState>) { }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
    this.store.dispatch(fromCoreActions.CoreActions.showMainLoader());

    setTimeout(() => {
      this.messageService.showSuccessMessage('App inicialziada');
      this.store.dispatch(fromCoreActions.CoreActions.hideMainLoader());
    }, 1000);

  }
}
