/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/
//Title: Treehouse Project 3
//Project: Interactive Form
//Goal: exceed expectation
//If i get anything less than exceed expectation, please fail it so i can try for exceed expectation again. Thank You.
//Selected diffentent parts of the form and store them in variables i'll be calling throught the project
const $form = $('#form');
const $name = $('#name');
const $email = $('#mail');
const $cardDiv = $('#credit-card');
const $cardNumber = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');
const $expiration = $('#exp-month');
const $title = $('#title');
const $otherTitle = $('#other-title');
const $design = $('#design');
const $color = $('#color');
const $payment = $('#payment');
const $button = $('button');
const $colorDiv = $('#colors-js-puns');
const $activitiesInput = $('.activities input');
//Made the name input the default focus when the page loads.
$name.focus();
//Hide the "other-title" input untill that option is selected in the job title menu.
$otherTitle.hide();
//The change event that shows the "other-title" input when selected.
$title.on('change', function() {
	if ($('#title option:selected').text() === 'Other') {
		$otherTitle.show();
	} else {
		$otherTitle.hide();
	}
});
//DESIGN SECTION
//Hide the color menu. Only shows up after an option from the "select theme" is selected
//Exceed expection: T Shirt Section.
$colorDiv.hide();
//The change event that reveals the color menu.
$design.on('change', function(e) {
	if ($(this)) {
		$colorDiv.show();
	} else {
		$colorDiv.hide();
	}
});
//The change event that shows different color option depending on the theme option selected
$design.on('change', function() {
	if ($('#design option:selected').val() === 'js puns') {
		$('#color option').removeAttr("selected");
		$('#color option').show();
		$('#color option').filter('[value="tomato"], [value="steelblue"], [value="dimgrey"]').hide();
		$('#color option[value="cornflowerblue"]').attr('selected', 'selected');
	} else if ($('#design option:selected').val() === 'heart js') {
		$('#color option').removeAttr("selected");
		$('#color option').show();
		$('#color option').filter('[value="darkslategrey"], [value="gold"], [value="cornflowerblue"]').hide();
		$('#color option[value="tomato"]').attr('selected', 'selected');
	} else {
		$('#color option').removeAttr("selected");
		$colorDiv.hide();
	}
});
//ACTIVITIES SECTION
//Created a variable keeps track of the amount of each activity selected.
let amount = 0;
//Created a label & a span to display the dollar amount of the amount variable.
let $totalAmount = $('<label>Total: $<span id="total"></span></label>');
//Insert & hide it below(after) the activity checkboxes, so it displays only when a checkbox is checked.
$($totalAmount).insertAfter('.activities');
$totalAmount.hide();
//The function I created to keep my code DRY.
//It takes 2 arguments: an inputs' name and its dollar amount
//It checks if the input is checked/unchecked and add/subtract the amount of the input's activity, & display amount
//When called in a change eventListener.
const showDollarAmount = (inputChecked, dollar) => {
	const $toCheck = $("input[name=" + inputChecked + "]").prop('checked');
	if ($toCheck) {
		amount += dollar;
	} else if (!$toCheck) {
		amount -= dollar;
	}
	$('#total').text(amount);
}
//Another function to keep my code DRY.
//It takes in the names of 2 inputs as arguments, and toggles between checked/unchecked of the argument.
//And disables the input of the second argument if the first is checked & vice-versa, when called in a change event.
const compressActivities = (checkInput, disableInput) => {
	const $toCheck = $('input[name=' + checkInput + ']').prop('checked');
	if ($toCheck) {
		$('input[name=' + disableInput + ']').attr('disabled', true);
	} else if (!$toCheck) {
		$('input[name=' + disableInput + ']').attr('disabled', false);
	}
}
//The change eventListener i created to call the "showDollarAmount" and "compressActivities" function.
$activitiesInput.on('change', function(e) {
	$totalAmount.show();
	if ($(e.target).prop("name") === "all") {
		showDollarAmount("all", 200);
	} else if ($(e.target).prop("name") === "js-frameworks") {
		compressActivities('js-frameworks', 'express');
		showDollarAmount('js-frameworks', 100);
	} else {
		if ($(e.target).prop("name") === "express") {
			compressActivities('express', 'js-frameworks');
			showDollarAmount('express', 100);
		} else if ($(e.target).prop("name") === "js-libs") {
			compressActivities('js-libs', 'node');
			showDollarAmount('js-libs', 100);
		} else if ($(e.target).prop("name") === "node") {
			compressActivities('node', 'js-libs');
			showDollarAmount('node', 100);
		} else if ($(e.target).prop("name") === "build-tools") {
			showDollarAmount('build-tools', 100);
		} else if ($(e.target).prop("name") === "npm") {
			showDollarAmount('npm', 100);
		}
	}
});
//PAYMENT SECTION
//This code makes the credit-card option the default payment method.
$('#payment option[value="credit card"]').attr('selected', true);
//And this hides the other payment methods.
$('p').parent().hide();
//This disables the 'select method' option, so that it can't be selected as a payment option.
$('#payment option[value="select_method"]').prop('disabled', true);
//created a span element with an error message and insert it 'before' the credit card input.
const $empty = $('<span>Enter A Credit Card Number</span>');
//hides it, shows up only when the credit-card input is on focus with a 'focus' event.
$empty.hide();
$cardNumber.on('focus', function(e) {
	if ($(this).val() === "") {
		$empty.insertBefore($cardNumber);
		$empty.show();
	}
});
//I hide the error message when the credit-card input is NOT on focus with a 'blur' event.
$cardNumber.on('blur', function(e) {
	$empty.hide();
});
//With this 'input' event i hide or show the error message depending on whether the input is empty or not.
//If empty the error message shows, if not it hides.
//Exceed expectation(card-number input): Conditional Error message.
$cardNumber.on('input', function(e) {
	if (event.target.value.length <= 0) {
		$empty.show()
	} else {
		$empty.hide();
	}
});
//This change event shows the payment method selected and hides the rest.
$payment.on('change', function() {
	if ($('#payment option:selected').val() === 'credit card') {
		//I insert the credit-card div here because i had to "detach" it to prevent it from validating--
		//When its not the choosen method of payment.
		$cardDiv.insertAfter('#payment');
		$('p').parent().hide();
		$('#credit-card').show();
	} else if ($('#payment option:selected').val() === 'paypal') {
		$cardDiv.detach();
		$("p:eq(0)").parent().show();
		$('#credit-card').hide();
		$("p:eq(1)").parent().hide();
	} else if ($('#payment option:selected').val() === 'bitcoin') {
		$cardDiv.detach();
		$("p:eq(1)").parent().show();
		$('#credit-card').hide();
		$("p:eq(0)").parent().hide();
	}
});
//VALIDATION SECTION
//(EXceed expection for all my inputs: Real-time Error Message)
//All of my inputs are validated, except the other-title input.
//These are the error messages i created for them, appended and hide them after every input.
const $nameError = $('<span id="nameError">Please Enter Letters Only!</span>');
$($nameError).insertAfter($name);
$nameError.hide();
const $emailError = $('<span id="emailError">Please Enter A Valid Email Address!</span>');
$($emailError).insertAfter($email);
$emailError.hide();
const $cardError = $('<span id="cardError">Enter 13 to 16 digits</span>');
$($cardError).insertAfter($cardNumber);
$($cardError).css('color', 'red');
$cardError.hide();
const $zipError = $('<span id="zipError">5 Digits</span>');
$($zipError).insertAfter($zip);
$($zipError).css('color', 'red');
$zipError.hide();
const $cvvError = $('<span id="cvvError">3 Digits</span>');
$($cvvError).css('color', 'red');
$($cvvError).insertAfter($cvv);
$cvvError.hide();
//My validation code for every text input. The returns True if the input value matches the regex, and false otherwise.
const validName = (name) => {
	const trueName = /^[a-z]+$/i.test(name);
	if (trueName) {
		return true;
	} else {
		return false;
	}
}
const validEmail = (email) => {
	const trueEmail = /^[^@]+@[a-z]+\.[a-z]+$/i.test(email);
	if (trueEmail) {
		return true;
	} else {
		return false;
	}
}
const validCardNum = (card) => {
	const trueCard = /^\d{13,16}$/.test(card);
	if (trueCard) {
		return true;
	} else {
		return false;
	}
}
const validZib = (zip) => {
	const trueZip = /^\d{5}$/.test(zip);
	if (trueZip) {
		return true;
	} else {
		return false;
	}
}
const validCvv = (cvv) => {
	const trueCvv = /^\d{3}$/.test(cvv);
	if (trueCvv) {
		return true;
	} else {
		return false;
	}
}
//The function that shows or hides my validation error/tip messages
const tipAppear = (show, element) => {
	if (show) {
		element.style.display = "inherit";
	} else {
		element.style.display = "none";
	}
}
//This is a DRY function that takes in the validators i wrote as arguments--
//And check the targeted input value if it matches validating code..sends out error message if it doesn't.
const creatorOfListeners = (validator) => {
	return e => {
		const text = e.target.value;
		const valid = validator(text);
		const showTip = text !== "" && !valid;
		const tip = e.target.nextElementSibling;
		tipAppear(showTip, tip);
	};
};
//The eventListeners for my validators, that took the creatorOfListeners function as argument.
$name.on('input', creatorOfListeners(validName));
$email.on('input', creatorOfListeners(validEmail));
$cardNumber.on('input', creatorOfListeners(validCardNum));
$zip.on('input', creatorOfListeners(validZib));
$cvv.on('input', creatorOfListeners(validCvv));
//Span element with the error message for the activity input checkboxes.
const $checkboxError = $('<span id="error">Please select an activity</span>');
//The submit form "submit" event that prevents the page from submitting if an input field is empty--
//incorrect validation or at least one checkbox is not checked.
$form.on('submit', function(e) {
	const nameInput = validName($name.val());
	const emailInput = validEmail($email.val());
	const cardInput = validCardNum($cardNumber.val());
	const zipInput = validZib($zip.val());
	const cvvInput = validCvv($cvv.val());
	if ($('#payment option:selected').val() === 'credit card'){
	if (!nameInput || !emailInput || !cardInput || !zipInput || !cvvInput) {
		event.preventDefault();
	}
}  else if ($('#payment option:selected').val() === 'paypal') {
	if (!nameInput || !emailInput) {
		event.preventDefault();
	}
}	else if ($('#payment option:selected').val() === 'bitcoin'){
}	if (!nameInput || !emailInput) {
		event.preventDefault();
	}
	$('input:not(#other-title)').each(function(e) {
		const $error = $('<span id="error">Enter Input</span>');
		if ($(this).val() === "") {
			event.preventDefault();
			$(this).css('border-color', 'red');
			$error.insertBefore($(this));
			$error.delay(1000).fadeOut(1000);
		} else if ($(this).val() !== "") {
			$(this).css('border-color', '#5e97b0');
		}
	})
	if ($('input:checked').length <= 0) {
		$checkboxError.show();
		$checkboxError.insertAfter('.activities');
		event.preventDefault();
	} else {
		$checkboxError.hide();
	}
});
