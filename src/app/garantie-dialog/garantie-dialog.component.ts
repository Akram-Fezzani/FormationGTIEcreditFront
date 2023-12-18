import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-garantie-dialog',
  templateUrl: './garantie-dialog.component.html',
  styleUrls: ['./garantie-dialog.component.css']
})
export class GarantieDialogComponent implements OnInit {
  gar!:any;
  form!: FormGroup;
  garantieForm!: FormGroup;
  display: boolean = false;
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.garantieForm = this.fb.group({
      cin: [
        '', 
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
        ],   
      });
  }
}
