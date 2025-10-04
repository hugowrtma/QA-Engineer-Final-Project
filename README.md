# 🧪 Final Project – Quality Assurance Engineer (SanberCode Bootcamp)

This project is my **Final Project for the Quality Assurance Engineer Bootcamp at SanberCode**, focusing on **Automation Testing** using **Cypress** with the **Page Object Model (POM)** approach and **API Intercept testing**.

---

## 📋 Project Overview

This automation project is built for testing the **OrangeHRM web application**.  
It includes **functional testing**, **negative test cases**, and **API intercept validations** to ensure both frontend and backend components work as expected.

The tests are designed to simulate real user interactions such as login, logout, forgot password, and dashboard navigation — all automated for efficiency and repeatability.

---

## 🧰 Tech Stack

| Category | Tools / Framework |
|-----------|------------------|
| Language | JavaScript |
| Testing Framework | Cypress |
| Design Pattern | Page Object Model (POM) |
| API Testing | Cypress Intercept |
| Target Application | OrangeHRM (opensource-demo.orangehrmlive.com) |

---

## ✅ Key Features

- 20+ automated test cases  
- Page Object Model (POM) implementation  
- API intercept testing for multiple endpoints  
- E2E tests for login, forgot password, and dashboard  
- Organized test structure for scalability  
- Clear validation of UI and API responses  

---

## 🧩 Project Structure

QA-Engineer-Final-Project/
│
├── cypress/
│ ├── e2e/
│ │ └── Final Project.cy.js          # File utama test case kamu (berisi scenario end-to-end)
│ │
│ ├── support/
│ │ ├── pages/                       # Folder untuk POM (Page Object Model)
│ │ │ ├── LoginPage.js
│ │ │ ├── DashboardPage.js
│ │ │ └── ForgotPasswordPage.js
│ │ │
│ │ ├── data/                        # Data input seperti credentials
│ │ │ └── userData.js
│ │ │
│ │ └── commands.js                  # Custom Cypress commands (optional)
│ │
│ └── fixtures/
│   └── example.json                 # Data statis/mock (optional)
│
├── cypress.config.js                # Konfigurasi Cypress (baseUrl, viewport, dsb)
├── package.json                     # Dependency dan script (misal: "test": "cypress run")
└── README.md                        # Dokumentasi proyek kamu

---

## 🚀 How to Run Tests

1️⃣ Clone the Repository
git clone https://github.com/hugowrtma/QA-Engineer-Final-Project.git
cd QA-Engineer-Final-Project
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Open Cypress Test Runner
bash
Copy code
npx cypress open
4️⃣ Run Tests in Headless Mode
bash
Copy code
npx cypress run

---

🧠 What I Learned
Writing maintainable test scripts using Page Object Model
Automating E2E tests for real-world scenarios
Validating frontend–backend interaction using cy.intercept()
Organizing test suites for scalability and reusability
Gaining confidence in automation QA best practices

---

🎥 Demo Video
Watch the full project presentation on YouTube: https://youtu.be/SH8OkHofpQE?si=9dlORJxe_lZgw6eW

---

👤 Author
Oktaryan Hugo
🎓 Quality Assurance Engineer Bootcamp Graduate – SanberCode
💼 Aspiring QA Engineer passionate about software quality and automation.
📫 LinkedIn Profile (add your real link)

---

🏷️ Tags
#QualityAssurance #Cypress #TestAutomation #Sanbercode #QABootcamp #JavaScript #AutomationTesting #OrangeHRM
