import { AbstractControl, FormControl } from "@angular/forms";

export default class Validation{

    //função para validar o match de 2 campos
    static match(controlName: string, checkControlName: string){

        return (controls: AbstractControl) => {
            const control = controls.get(controlName) as FormControl;
            const checkControl = controls.get(checkControlName) as FormControl;

            if (checkControl.errors && !checkControl.errors['matching']){

                return null;
            }

            if (control.value !== checkControl.value){
               (controls.get(checkControlName) as FormControl).setErrors({matching: true});
                return {matching: true};
            }

            else{
                return null;
            }
        }
    }
}