import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../services/file.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
import {  OnInit } from '@angular/core';
import { AppRoutingModule } from '../../app.routes';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchPipe } from '../../searchpipe.pipe';

@Component({
  selector: 'app-add',
  providers: [DatePipe],
  standalone:true,
  imports: [CommonModule,FormsModule ,ReactiveFormsModule,RouterModule,SearchPipe] ,
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'] ,
  // schemas: [NO_ERRORS_SCHEMA] // إضافة هذا

})
export class AddComponent {

  constructor(private _AuthService: AuthService,private datePipe: DatePipe){
    
  }
  error:string = "";
  isLoading = false;
  radio="";
  filteredDirectorates: string[] = [];
  searchTerm: string = '';

  directorates: string[] = [
    'الجهاز رئيس',
    'الجهاز رئيس سكرتارية',
    'رئيس قسم المحفوظات (الأرشيف)',
    'مكتب رئيس الجهاز',
    'الجهاز رئيس نائب',
    'الجهاز رئيس نائب',
    'الجهاز رئيس نائب',
    'الجهاز لرئيس يس معاون هند',
    'الجهاز لرئيس يس معاون هند',
    'الجهاز لرئيس يس معاون هند',
    'شؤون مالية وإدارية وعقارية',
    'الجهاز لرئيس يس معاون هند',
    'المعلومات مركز',
    'العقارية الإدارة',
    'التراخيص',
    'الإدارة المالية',
    'المكتب الفني',
    'مركز خدمة المواطن التكنولوجي',
    'الموارد البشرية',
    'الإدارة القانونية',
    'الحركة والتشغيل',
    'الشؤون الإدارية وشؤون العاملين',
    'إدارة الاستثمار',
    'إدارة التنمية',
    'إدارة البيئة',
    'التحول الرقمي',
    'التخطيط والمتابعة',
    'إدارة العلاقات العامة',
    'العطاءات والعقود',
    'إدارة الزراعة',
    'إدارة الكهرباء',
    'المشروعات',
    'إدارة المخازن',
    'جهاز توشكى',
    'الأرشيف بالمركز التكنولوجي',
    'إدارة الجودة',
    'إدارة التنفيذ',
    'إدارة المساحة',
    'إدارة الأمن',
    'إدارة المرافق والطرق والمياه'
  ];    

 addingFileForm: FormGroup= new FormGroup({

  title: new FormControl(null,[Validators.required ,Validators.minLength(3),Validators.maxLength(30)]),
  letterNumber: new FormControl(null,[Validators.required ]), 
  description: new FormControl(null ),
  tags: new FormControl(null ,[Validators.required ]),
  fileDate: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
  letterType: new FormControl(null ,[Validators.required]),
  // currentDate: new FormControl(null),
  deliveryDate :new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
  responseDuration:new FormControl(),
  Directorate:new FormControl(),

  file: new FormControl([], [Validators.required]),
  attachmentCount: new FormControl(null)
 });
//  this.filteredDirectorates = this.directorates;
 
radioOutgoing(){
  this.radio="الصادر"
  console.log(this.addingFileForm.controls['letterType'].value);

}
radioIncoming(){
  this.radio="الوارد"
  console.log(this.addingFileForm.controls['letterType'].value);
}
 submitaddingFileForm(addingFileForm:FormGroup){
  this.isLoading=true;
  console.log(addingFileForm.value) 

  this._AuthService.register(addingFileForm.value).subscribe({

    next: (response)=>{
      this.isLoading=false;
      if (response.message ==='success'){}
      else {this.error=response.message; }
    },error: (err) => {
      this.isLoading = false;
      this.error = err.message;
    }
  })
 };
 ngOnInit(): void {
  const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  this.addingFileForm.patchValue({ fileDate: currentDate, deliveryDate: currentDate });
  this.filteredDirectorates = [...this.directorates] // Copy all options initially
  this.addingFileForm.get('Directorate')?.valueChanges.subscribe(value => {
    this.filteredDirectorates = this.directorates.filter(d =>
      d.toLowerCase().includes(value.toLowerCase())
    );
  });
  
}
// onSearchChange() {
//   this.filteredDirectorates = this.directorates.filter(directorate =>
//     directorate.toLowerCase().includes(this.searchTerm.toLowerCase()) // بحث غير حساس لحالة الأحرف
//   );
// }


  // constructor(private fb: FormBuilder, private fileService: FileService,) {
  //   // إنشاء النموذج
  //   this.form = this.fb.group({
  //     letterNumber: ['', Validators.required],
  //     title: ['', [Validators.required, Validators.minLength(5)]],
  //     description: [''],
  //     file: [null],
  //     tags: ['']
  //   });
  // }

  // دالة لإضافة ملف
  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const fileArray = Array.from(input.files); // تحويل FileList إلى Array
      this.addingFileForm.patchValue({
        file: fileArray // تخزين الملفات المتعددة
      });
      console.log("Selected Files:", fileArray); // طباعة الملفات التي تم اختيارها
    }
  }
  
  
  // handleFileInput(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input?.files && input.files.length > 0) {
  //     this.form.get('file')?.setValue(input.files[0]);
  //   }
  // }

  // // دالة لإدخال الوسوم
  // handleTagsInput(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   this.form.get('tags')?.setValue(input.value.split(','));
  // }

  // // عند الإرسال
  // onSubmit() {
  //   if (this.form.valid) {
  //     console.log('Form Data:', this.form.value);
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }
}
