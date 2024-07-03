import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { courseTitleValidator } from "../../validators/course-title.validator";

@Component({
  selector: "create-course-step-1",
  templateUrl: "./create-course-step-1.component.html",
  styleUrls: ["./create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component implements OnInit {
  form = this.formBuilder.group({
    title: [
      "",
      {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
        ],
        asyncValidators: [courseTitleValidator(this.courses)],
        updateOn: "blur",
      },
    ],
    releasedAt: [new Date(), Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private courses: CoursesService
  ) {}

  ngOnInit() {}

  get courseTitle() {
    return this.form.controls["title"];
  }
}
