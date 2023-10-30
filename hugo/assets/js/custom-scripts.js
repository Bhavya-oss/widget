function validatePhoneNumber(input) {
  input.value = input.value.replace(/\D/g, ""); // Remove non-numeric characters

  if (input.value.length > 10) {
    input.value = input.value.slice(0, 10); // Truncate input to 10 digits
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyAVkhv2ZG_gB9yl113rVsrHAjQEnejhsm0",
  authDomain: "biggworks-dd979.firebaseapp.com",
  databaseURL:
    "https://biggworks-dd979-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "biggworks-dd979",
  storageBucket: "biggworks-dd979.appspot.com",
  messagingSenderId: "160882722753",
  appId: "1:160882722753:web:f067b273803ff585359140",
  measurementId: "G-377HKGT4RW",
};
firebase.initializeApp(firebaseConfig);

let candidateInfo = firebase.database().ref("candidate");

var application = document.getElementById("application");

function saveRecordtoDatabase() {
  console.log("check error in the form");
  var firstName = document.getElementById("form_name").value;
  var lastName = document.getElementById("form_lastname").value;
  var email = document.getElementById("form_email").value;
  var phone = document.getElementById("form_phone").value;
  event.preventDefault();

  var errorContainer = document.querySelector(".messages");
  errorContainer.innerHTML = "";

  let form = document.getElementById("indexForm");

  if (firstName.trim() === "") {
    displayError("form_name", "First Name is required.");
  } 

  if (lastName.trim() === "") {
    displayError("form_lastname", "Last Name is required.");
  }

  if (email.trim() === "") {
    displayError("form_email", "Email address is required.");
  } else if (!validateEmail(email)) {
    displayError("form_email", "Please enter a valid email address.");
  }

  // ... Perform validation for other fields

  if (
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    validateEmail(email)
  ) {
    let newCandidateInfo = candidateInfo.push();

    newCandidateInfo.set({
      name: firstName,
      surname: lastName,
      email: email,
      phone: phone,
      message: document.getElementById("form_message").value,
    });
    console.log("reset the form", firstName);

    form.reset();

    // Reset the form after submission

    var successContainer = document.querySelector(".messages");
    successContainer.innerHTML =
      '<div class="alert alert-success">Record saved successfully!</div>';

    setTimeout(function () {
      successContainer.innerHTML = "";
    }, 3000);
  }
}

function handleFormFieldChange(e, fieldName) {
  const inputValue = e.value;

  if (inputValue.trim() !== "") {
    displayError(fieldName, "");
  }
}

function displayError(fieldId, errorMessage) {
  var errorContainer = document.getElementById(fieldId + "_error");
  errorContainer.innerHTML = errorMessage;
}

function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return pattern.test(email);
}

function resetForm() {
  document.getElementById("form_name").value = "";
  document.getElementById("form_lastname").value = "";
  document.getElementById("form_email").value = "";
  document.getElementById("form_phone").value = "";
  document.getElementById("form_message").value = "";

  // Clear any error messages
  document.getElementById("form_name_error").innerHTML = "";
  document.getElementById("form_lastname_error").innerHTML = "";
  document.getElementById("form_email_error").innerHTML = "";

  // Reset any other variables or data as needed
}


function savelandingpageRecordtoDatabase() {
  // Get form values
event.preventDefault();

  var name = document.getElementById('form_name').value;
  var email = document.getElementById('form_email').value;
  var phone = document.getElementById('form_phone').value;
  var budget = document.getElementById('dropdown_budget').value;
  var description = document.getElementById('form_message').value;

let form = document.getElementById('landingpage1Form')


if (name.trim() === "") {
  displayError("form_name", "First Name is required.");
} 



if (email.trim() === "") {
  displayError("form_email", "Email address is required.");
} else if (!validateEmail(email)) {
  displayError("form_email", "Please enter a valid email address.");
}

//   Validate required fields
//   if (!name || !email || !phone) {
//     alert("Please fill in all required fields.");
//     return false; // Prevent form submission
//   }

//   Create a new record in Firebase
// var newRecordRef = candidateInfo.child('records').push();
//   newRecordRef.set({
    // name: name,
    // email: email,
    // phone: phone,
    // budget: budget,
    // description: description
//   });

//   Clear the form after successful submission
//   document.getElementById('landingpage1Form').reset();
//   form.reset();

//   return true; // Allow form submission

  if (
    name.trim() !== "" &&
    validateEmail(email)
  ) {
    let newRecordRef = candidateInfo.child('records').push();

    newRecordRef.set({
      name: name,
      email: email,
      phone: phone,
      budget: budget,
      description: description
    });
    console.log("reset the form", name);

    form.reset();

    // Reset the form after submission

    var successContainer = document.querySelector(".messages");
    successContainer.innerHTML =
      '<div class="alert alert-success">Record saved successfully!</div>';

    setTimeout(function () {
      successContainer.innerHTML = "";
    }, 3000);
  }


}


const rows = document.querySelectorAll('.talent-rows');
var hiddenRows = Array.from(rows).slice(3);

const readMoreButton = document.getElementById('read-more');
const readLessButton = document.getElementById('read-less');
console.log(rows)
hiddenRows.forEach(item => item.classList.add('hidden'))
if (rows.length <= 3) {
    readMoreButton.classList.toggle('d-none');
}
// Show or hide the rows based on the button click
function toggleRows(event) {
    event.preventDefault();
    hiddenRows.forEach(row => {
        row.classList.toggle('hidden');
    });
    readMoreButton.classList.toggle('d-none');
    readLessButton.classList.toggle('d-none');
};

// Add click event listener to the "Read More" button
readMoreButton.addEventListener('click', toggleRows);

// Add click event listener to the "Read Less" button
readLessButton.addEventListener('click', toggleRows);



let emailInfo = firebase.database().ref("emailInfo");



function submitEmail() {
  event.preventDefault()
  console.log("email");
  try {
    // Attempt to execute the following code
    let newContactInfo = emailInfo.push();
    let data = document.getElementById("footerEmail").value;

    newContactInfo.set({
      email: data
    });

    let form = document.getElementById("test");
    form.reset();

    // Display the "joined" message
    let message = document.getElementById("message");
    message.style.display = "block";
    message.textContent = "Joined: " + data;

    // Hide the message after a certain time (optional)
    setTimeout(function() {
      message.style.display = "none";
    }, 3000); // 3 seconds
  } catch (error) {
    // Log the error to the console
    console.error("An error occurred:", error);
    
    // Show the error using alert
    alert(error);
    // You can display an error message or take other actions here
} finally {
    // This block will be executed whether an error occurred or not
    // Add any finalization or cleanup code here
    // For example, clear error messages
    let errorContainer = document.querySelector(".error-message");
    errorContainer.innerHTML = ""; // Clear error messages
  }
}




  function openModal(modalId) {
var modal = document.getElementById(modalId);
modal.style.display = "block";
}

function closeModal(modalId) {
var modal = document.getElementById(modalId);
modal.style.display = "none";
}