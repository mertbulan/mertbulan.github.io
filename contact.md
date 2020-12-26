---
title: Contact
layout: page
---

<div class="form-container">
  <form id="my-form" action="https://formspree.io/f/xleoolyd" method="POST">
    <label for="email">Email</label><br>
    <input name="email" type="email" required placeholder="you@domain.com"/>
    <br>
    <label for="message">Message</label><br>
    <textarea name="message" rows="2" placeholder="Enter your message here ..."></textarea>
    <br>
    <button id="my-form-button">Submit</button>
    <span id="my-form-status"></span>
  </form>
</div>

<script>
  window.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("my-form");
    var button = document.getElementById("my-form-button");
    var status = document.getElementById("my-form-status");

    function success() {
      form.reset();
      status.innerHTML = "Thanks!";
    }

    function error() {
      status.innerHTML = "Oops! There was a problem.";
    }

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
</script>

<style type="text/css">
  .form-container {
    width: 500px;
  }

  *:focus {
    outline: 0;
  }

  label {
    font-size: 0.85em;
  }

  input[type=email], textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid white;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
  }

  input[type=email]:focus, textarea:focus {
    border: 1px solid #E74727;
  }

  #my-form-button {
    background: #E74727;
    margin: 0 auto;
    outline: 0;
    color: white;
    border: 0;
    padding: 12px 24px;
    border-radius: 4px;
    position: relative;
    display: inline-block;
    text-align: center;
  }

  #my-form-button:hover {
    cursor: pointer;
  }
</style>