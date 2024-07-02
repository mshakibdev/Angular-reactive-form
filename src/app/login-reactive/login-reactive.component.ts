import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validator";

@Component({
  selector: "login",
  templateUrl: "./login-reactive.component.html",
  styleUrls: ["./login-reactive.component.css"],
})
export class LoginReactiveComponent implements OnInit {
  // IN REACTIVE FORM
  // EVERY SINGLE FORM VALUE IS NULLABLE BY DEFAULT for make non-nullable use `NonNullableFormBuilder`

  // TYPE OF FORM IS INFERRED BY ANGULAR BY DEFAULT
  form = this.formBuilder.group({
    email: [
      "",
      {
        validators: [Validators.required, Validators.email],
        updateOn: "blur",
      },
    ],
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator(),
      ],
    ],
  });
  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit() {}

  get email() {
    return this.form.controls["email"];
  }

  get password() {
    return this.form.controls["password"];
  }
  login() {}
  reset() {
    this.form.reset();
    console.log(this.form.value);
  }
}
