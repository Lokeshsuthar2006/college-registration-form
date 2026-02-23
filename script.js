console.log("script.js loaded");

const form = document.getElementById("regForm");
const msg = document.getElementById("msg");
const resetBtn = document.getElementById("resetBtn");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    fatherName: document.getElementById("fatherName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    course: document.getElementById("course").value,
    semester: document.getElementById("semester").value,
    address: document.getElementById("address").value
  };

  console.log("Sending data:", data);

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      msg.innerHTML = `<span class="text-success">Data sent to server successfully!</span>`;
      form.reset();
    } else {
      msg.innerHTML = `<span class="text-danger">Server error</span>`;
    }
  } catch (err) {
    console.error(err);
    msg.innerHTML = `<span class="text-danger">Error submitting form. Try again.</span>`;
  }
});

// Clear message on reset
resetBtn.addEventListener("click", function () {
  msg.innerHTML = "";
});