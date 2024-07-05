import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { createPromoRangeValidator } from "../../validators/date-range.validator";

@Component({
  selector: "create-course-step-2",
  templateUrl: "create-course-step-2.component.html",
  styleUrls: ["create-course-step-2.component.scss"],
})
export class CreateCourseStep2Component implements OnInit {
  form = this.formBuilder.group(
    {
      courseType: ["premium", Validators.required],
      price: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(999),
          Validators.pattern("[0-9]+"),
        ],
      ],
      promoStartAt: [null],
      promoEndAt: [null],
    },
    {
      validators: [createPromoRangeValidator()],
      updateOn: "blur",
    }
  );
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form.valueChanges.subscribe((val) => {
      console.log("val", val);
      const priceControl = this.form.controls["price"];
      if (val.courseType === "free" && priceControl.enabled) {
        priceControl.disable({ emitEvent: false });
      } else if (val.courseType === "premium" && priceControl.disabled) {
        // disable triggering event for any value changes inside subscription
        priceControl.enable({ emitEvent: false });
      }
    });
  }
}
