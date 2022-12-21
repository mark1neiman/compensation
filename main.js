const incomeInput = document.getElementById('income');
const daysInput = document.getElementById('days');
const tbCheckbox = document.getElementById('tb');
const employerCompensationSpan = document.getElementById('employer-compensation');
const insuranceCompensationSpan = document.getElementById('insurance-compensation');
const totalCompensationSpan = document.getElementById('total-compensation');
const totalEmployerDays = document.getElementById('employer-days');
const totalInsuranceDays = document.getElementById('insurance-days');
const calculateButton = document.getElementById('calculate-button');
const dailyAllowenceEmployerSpan = document.getElementById('daily-allowenceEmp');
const dailyAllowenceInsuranceSpan = document.getElementById('daily-allowenceIns');
const totalDaysSpan = document.getElementById('total-days');

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

    const dailyAllowenceInsurance = insuranceCompensation / insuranceDays;
    const dailyAllowenceEmployer = employerCompensation / EmployerDays;

    const totalCompensation = employerCompensation + insuranceCompensation;
    const totalDays = insuranceDays + EmployerDays + 3;

    employerCompensationSpan.innerText = employerCompensation.toFixed(2) + '€';
    insuranceCompensationSpan.innerText = insuranceCompensation.toFixed(2) + '€';
    totalCompensationSpan.innerText = totalCompensation.toFixed(2) + ' €';
    totalEmployerDays.innerText = EmployerDays.toFixed();

    totalDaysSpan.innerText = totalDays.toFixed();
    if (totalDays >= 0) {
        totalDaysSpan.innerText = totalDays.toFixed();
    } else {
        totalDaysSpan.innerText = "0";
    }

    dailyAllowenceEmployerSpan.innerText = dailyAllowenceEmployer.toFixed(2) + ' €';

    if (dailyAllowenceInsurance >= 0) {
        dailyAllowenceInsuranceSpan.innerText = dailyAllowenceInsurance.toFixed(2) + ' €';
    } else {
        dailyAllowenceInsuranceSpan.innerText = "0" + ' €';
    }

    if (EmployerDays > 0) {
        totalEmployerDays.innerText = EmployerDays.toFixed() + ' days';
    } else {
        totalEmployerDays.innerText = "0" + ' days';
    }

    if (insuranceDays > 0) {
        totalInsuranceDays.innerText = insuranceDays.toFixed() + ' days';
    } else {
        totalInsuranceDays.innerText = "0" + ' days';
    }
}

calculateButton.addEventListener('click', function (event) {
    event.preventDefault();
    calculateCompensation();
});

window.onload = function () {
    calculateCompensation();
}
