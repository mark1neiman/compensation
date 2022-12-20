const incomeInput = document.getElementById('income');
const daysInput = document.getElementById('days');
const tbCheckbox = document.getElementById('tb');
const employerCompensationSpan = document.getElementById('employer-compensation');
const insuranceCompensationSpan = document.getElementById('insurance-compensation');
const totalCompensationSpan = document.getElementById('total-compensation');
const totalEmployerDays = document.getElementById('employer-days');
const totalInsuranceDays = document.getElementById('insurance-days');

function calculateCompensation() {
    const income = incomeInput.value;
    const days = daysInput.value;
    const hasTb = tbCheckbox.checked;

    let employerCompensation = 0;
    let EmployerDays = Math.min(days - 3, 4);
    if (days >= 5) {
        employerCompensation = EmployerDays * (income / 0.43572985 / 100);
        // number 0.43572985 sain kalkulaator.ee Haigushüvitise kalkulaator (tööandja)
    }

    let insuranceCompensation = 0;
    let insuranceDays = days - 7;
    if (insuranceDays > 0) {
        const maxDays = hasTb ? 233 : 175;
        insuranceDays = Math.min(insuranceDays, maxDays);
        insuranceCompensation = insuranceDays * (income * 0.7 / 30);
    }


    const totalCompensation = employerCompensation + insuranceCompensation;

    employerCompensationSpan.innerText = employerCompensation.toFixed(2);
    insuranceCompensationSpan.innerText = insuranceCompensation.toFixed(2);
    totalCompensationSpan.innerText = totalCompensation.toFixed(2);
    totalEmployerDays.innerText = EmployerDays.toFixed();
    if (insuranceDays > 0) {
        totalInsuranceDays.innerText = insuranceDays.toFixed();
    } else {
        totalInsuranceDays.innerText = "";
    }

}

incomeInput.addEventListener('change', calculateCompensation);
daysInput.addEventListener('change', calculateCompensation);
tbCheckbox.addEventListener('change', calculateCompensation);
